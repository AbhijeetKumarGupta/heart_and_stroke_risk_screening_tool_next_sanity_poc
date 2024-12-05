import client from "@/sanity/sanityClient";

export async function GET() {
  try {
    const questionCommonFields = `title,
            description,
            isRequired,
            multipleSelect,
            name,`;
    const optionCommonFields = `title,
              name,
              point,
              subfieldtype,`
    const surveyData = await client.fetch(`
      *[_type == "survey"]{
        name,
        max_score,
        sections[]->{
          section_name,
          questions[]->{
            ${questionCommonFields}
            options[]->{
              ${optionCommonFields}
              questionSubField[]->{
                ${questionCommonFields}
                options[]->{
                  ${optionCommonFields}
                },
                subQuestions[]->{
                  ${questionCommonFields}
                  options[]->{
                    ${optionCommonFields}
                  }
                }
              },
              optionSubField[]->{
                ${optionCommonFields}
              }
            },
            subQuestions[]->{
              ${questionCommonFields}
              subQuestions[]->{
                ${questionCommonFields}
                options[]->{
                  ${optionCommonFields}
                }
              }
            }
          }
        },
      }
    `);

    return new Response(
      JSON.stringify(surveyData),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching survey data', error }),
      { status: 500 }
    );
  }
}