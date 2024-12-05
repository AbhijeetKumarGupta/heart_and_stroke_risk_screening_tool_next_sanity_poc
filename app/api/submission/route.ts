import client from "@/sanity/sanityClient";

export async function POST(req: any) {
    try {
      const submissionData = await req.json();
  
      const { name, email } = submissionData;
  
      if (!name || !email) {
        return new Response(
          JSON.stringify({ success: false, message: 'Missing required fields' }),
          { status: 400 }
        );
      }
  
      const newSubmission = {
        _type: 'submission',
        ...submissionData
      };
  
      const createdSubmission = await client.create(newSubmission);
  
      return new Response(
        JSON.stringify({ success: true, survey: createdSubmission }),
        { status: 201 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: 'Error submitting survey', error }),
        { status: 500 }
      );
    }
  }