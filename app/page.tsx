'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Question from '../components/Question';
import styles from './page.module.css'

export default function SurveyPage() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [surveyData, setSurveyData] = useState<SurveyData>(null);
    const [formData, setFormData] = useState<Submission | {}>({});
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchSurveyData = async () => {
            const res = await fetch('/api/survey');
            const data = await res.json();
            setSurveyData(data[0]);
        };
        fetchSurveyData();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, questionKey: string, options?: Array<IOption>) => {
        const tempFormData = { ...formData }
        const fieldIdentifier = `${questionKey}.${e.target.name}`
        const deteteAllSelections = (fieldIdentifier: string) => {
            Object.keys(tempFormData).forEach((fieldKey) => {
                if (fieldKey.includes(fieldIdentifier as string)) {
                    delete tempFormData[fieldKey]
                }
            })
        }
        if (!e.target.checked) {
            deteteAllSelections(fieldIdentifier)
        } else {
            if(options?.length){
                options.forEach((option: IOption) => {
                    const optionKey = `${questionKey}.${option.name}`
                    if(tempFormData[optionKey]){
                        deteteAllSelections(`${questionKey}.`)
                    }
                })
            }
            tempFormData[fieldIdentifier] = { name: fieldIdentifier, point: +e.target.value }
        }
        setFormData({ ...tempFormData })
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const answers = Object.values(formData)
        const score = answers.reduce((sum, answer: Answer) => sum + answer.point, 0)

        try {
            const res = await fetch('/api/submission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    answers,
                    score,
                    max_score: surveyData?.max_score
                }),
            });

            const result = await res.json();
            if (result.success) {
                alert('Survey submitted successfully!');
                setName('');
                setEmail('');
                setFormData({});
                router.push(`/submission/${result?.survey?._id}`);
            } else {
                alert('There was an error submitting the survey.');
            }
            setLoading(false);
        } catch (error) {
            alert('There was an error submitting the survey.');
            setLoading(false);
        }
    };

    if (!surveyData) return (
        <div className={styles.loader_container}>
            <div className={styles.loader}/>
        </div>
    )

    return (
        <div className={styles.form_container}>
            <h1>{surveyData.name} :</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <hr/>
                <h2>User info :</h2>
                <div className={styles.user_info_container}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <br/>
                <hr/>
                <h2>Questions:</h2>
                <br />
                {surveyData.sections?.map?.((section: Section) =>
                    <div key={section?.section_name}>
                        <h3>{section?.section_name}</h3>
                        <br />
                        {section?.questions?.map((question: IQuestion) =>
                            <Question
                                questionKey={question?.name}
                                key={question?.name}
                                question={question}
                                onChange={handleChange}
                                formData={formData as Submission}
                            />
                        )}
                        <hr/>
                    </div>
                )}
                <br />
                <button 
                    type="submit" 
                    disabled={loading} 
                    style={{opacity: loading ? 0.5 : 1}}
                >
                    {loading ? 'Submitting' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
