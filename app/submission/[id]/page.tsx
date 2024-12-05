'use client';

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import styles from './report.module.css';

const fetchSubmissionData = async (id: string) => {
    try {
      const res = await fetch(`${window.location.origin}/api/submission/${id}`);
      
      if (!res.ok) {
        throw new Error(`Error fetching submission: ${res.statusText}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
};

export default function SurveyResult() {
    const { id } = useParams();
    const [submission, setSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        const getSubmissionData = async () => {
            const data = await fetchSubmissionData(id as string);
            if (data) {
                setSubmission(data);
            } else {
                notFound();
            }
        };
        getSubmissionData();
    }, [id]);

    if (!submission) return (
        <div className={styles.loader_container}>
            <div className={styles.loader}/>
        </div>
    )

    const percentageChance = (submission?.score / submission?.max_score) * 100;

    return (
        <div className={styles.report_container}>
            <h1>Survey Result :</h1>
            <div>
                <strong>○ Name:</strong> {submission?.name}
            </div>
            <div>
                <strong>○ Email:</strong> {submission?.email}
            </div>
            <div>
                <strong>○ Score:</strong> {submission?.score} / {submission?.max_score}
            </div>
            <div>
                <strong>○ Percentage chance of Heart and Stroke:</strong> {percentageChance?.toFixed?.(2)}%
            </div>
        </div>
    );
}
