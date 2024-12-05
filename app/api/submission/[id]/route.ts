import { NextApiRequest } from 'next';
import client from "@/sanity/sanityClient";

export async function GET(req: NextApiRequest, { params }: any) {
    const { id } = await params ;
  
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'ID is required' }),
        { status: 400 }
      );
    }
  
    try {
      /* Currenly hardcoded to fetch first survey but can be easily 
        extended to work multiple surveys.
      */
      const submissionData = await client.fetch(`
        *[_type == "submission" && _id == $id][0]{
          answers,
          email,
          max_score,
          name,
          score
        }`, 
        { id }
      );
  
      if (!submissionData) {
        return new Response(
          JSON.stringify({ success: false, message: 'Submission not found' }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify(submissionData),
        { status: 200 }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ success: false, message: 'Error fetching submission data', error: error.message }),
        { status: 500 }
      );
    }
}