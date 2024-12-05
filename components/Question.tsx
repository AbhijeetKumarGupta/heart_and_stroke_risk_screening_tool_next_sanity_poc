import Option from './Option'
import SubQuestion from './SubQuestion'

export default function Question({ questionKey, question, onChange, formData }: QuestionProps) {
    return (
        <label>
            <p>{`◘ `}{question?.title}</p>
            <span style={{ opacity: '0.6', fontSize: '15px' }}>{question?.description}</span>
            {
                question?.options?.map((option: IOption) =>
                    <Option 
                        questionKey={questionKey} 
                        key={option?.name} 
                        option={option} 
                        onChange={onChange} 
                        formData={formData}
                        question={question} 
                    />
                )
            }
            {
                question?.subQuestions?.map?.((subQuestion: IQuestion) =>
                    <SubQuestion 
                        questionKey={`${questionKey}.${subQuestion?.name}`} 
                        key={subQuestion?.name} 
                        question={subQuestion} 
                        onChange={onChange} 
                        formData={formData} 
                    />
                )
            }
            <br />
        </label>
    )
}