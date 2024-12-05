type Answer = {
    name: string;
    point: number;
};

type Submission = {
    name: string;
    email: string;
    answers: Answer[];
    score: number;
    max_score: number;
    [key: string]: any;
};

type QuestionCommonFields = {
    title: string;
    description: string;
    isRequired: boolean;
    multipleSelect: boolean;
    name: string;
};

interface IQuestion extends QuestionCommonFields {
    options: IOption[];
    questionSubField?: Question[];
    subQuestions?: SubQuestion[];
};

type OptionCommonFields = {
    title: string;
    name: string;
    point: number;
    subfieldtype: string;
};

interface IOption extends OptionCommonFields {
    optionSubField: Array<IOption>,
    questionSubField: Array<IQuestion>
}

interface ISubQuestion extends QuestionCommonFields {
    options: IOption[];
    subQuestions: SubQuestion[];
};

type Section = {
    section_name: string;
    questions: Question[];
};

type Survey = {
    name: string;
    max_score: number;
    sections: Section[];
};

type SurveyData = Survey | null;

type QuestionProps = {
    questionKey: string;
    question: IQuestion;
    onChange: (e: ChangeEvent<HTMLInputElement>, questionKey: string, options?: Array<IOption>) => void;
    formData: Submission;
}

type OptionProps = {
    questionKey: string;
    option: IOption;
    onChange: (e: ChangeEvent<HTMLInputElement>, questionKey: string, options?: Array<IOption>) => void;
    formData: Submission;
    question: IQuestion;
}