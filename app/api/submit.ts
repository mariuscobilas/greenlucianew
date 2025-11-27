// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID as string
);
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME as string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure the data from the request body
    const { firstName, lastName, email, organisation, consent } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !organisation || consent !== true) {
        return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    try {
        // 1. Map the form data keys to your Airtable Column Names
        // IMPORTANT: 'First Name', 'Last Name', 'Email', etc., must exactly match
        // the header names of the columns in your Airtable table.
        const record = await base(TABLE_NAME).create([
            {
                fields: {
                    'First Name': firstName,
                    'Last Name': lastName,
                    'Email': email,
                    'Organisation/Institution': organisation,
                    'Consent Given': consent ? 'Yes' : 'No', // Convert boolean to a string/checkbox value
                    'Date Registered': new Date().toISOString(), // Optional: add a timestamp
                },
            },
        ]);

        // 2. Respond with success
        res.status(200).json({ message: 'Registration successful', id: record[0].id });
    } catch (error) {
        console.error('Airtable API Error:', error);

        // 3. Respond with a detailed error
        res.status(500).json({
            message: 'Failed to submit registration. Check server logs.',
            error: (error as Error).message || 'Unknown error'
        });
    }
}