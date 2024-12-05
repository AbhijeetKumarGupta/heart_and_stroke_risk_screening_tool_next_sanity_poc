import Question from "./Question"

export default function SubQuestion({ questionKey, question, onChange, formData }: QuestionProps) {
    return (
        <div key={question?.name} style={{ marginLeft: '40px' }}>
            <Question 
                questionKey={questionKey}
                question={question}
                onChange={onChange}
                formData={formData}
            />
        </div>
    )
}