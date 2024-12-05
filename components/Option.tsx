import SubOption from "./SubOption";
import SubQuestion from "./SubQuestion";

export default function Option({questionKey, option, onChange, formData, question}: OptionProps) {
    const selectedValues = Object.keys(formData)
    const identifierKey = `${questionKey}.${option?.name}`
    const isSingleSelect = !question?.multipleSelect

    return (
        <div style={{marginLeft:'20px'}}>
            <label>
                <input
                    type="checkbox"
                    name={option?.name}
                    title={option?.title}
                    onChange={(e) => 
                        onChange(
                            e, 
                            questionKey, 
                            isSingleSelect ? question?.options : []
                        )}
                    value={option?.point}
                    checked={selectedValues.includes(identifierKey)}
                    style={{marginRight:'10px'}}
                />
                {option?.title}
            </label>
            <br/>
            {
                selectedValues?.includes(identifierKey) && option?.optionSubField?.map?.((subOption: IOption) => 
                    <SubOption 
                        questionKey={identifierKey} 
                        key={subOption?.name} 
                        option={subOption} 
                        onChange={onChange} 
                        formData={formData}
                        question={{
                            ...question,
                            options: option?.optionSubField
                        }}
                    />
                )
            }
            {
                selectedValues?.includes(identifierKey) && option?.questionSubField?.map?.((subQuestion: IQuestion) => 
                    <SubQuestion 
                        questionKey={identifierKey} 
                        key={subQuestion?.name} 
                        question={subQuestion} 
                        onChange={onChange} 
                        formData={formData}
                    />
                )
            }
        </div>
    )
}