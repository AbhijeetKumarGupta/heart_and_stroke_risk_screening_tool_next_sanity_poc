import Option from "./Option";

export default function SubOption({ questionKey, option, onChange, formData, question }: OptionProps) {
    return (
        <div style={{ marginLeft: '20px' }}>
            <Option
                questionKey={questionKey}
                option={option}
                onChange={onChange}
                formData={formData}
                question={question}
            />
        </div>
    )
}