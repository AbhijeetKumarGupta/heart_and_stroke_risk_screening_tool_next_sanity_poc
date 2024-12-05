import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";


export const config = defineConfig({
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || '',
    title: "heart-and-stroke-risk-screening-tool",
    apiVersion: "2024-12-03",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: { types: schemas }
})