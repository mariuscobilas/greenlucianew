import { Base } from "seatable-api";

export async function POST(req) {
    try {
        const formData = await req.json();
        const tableName = "Table1";

        //Config
        const config = {
            server: "https://cloud.seatable.io",
            APIToken: process.env.SEATABLE_API_KEY,
        };

        const base = new Base(config);
        await base.auth();

        //Adaugarea newRow
        const newRow = {
            "FirstName": formData.firstName,
            "LastName": formData.lastName,
            "Email": formData.email,
            "Organisation": formData.organisation,
            "Status": "New",
            "Submission Date": new Date().toISOString()
        };

        const result = await base.appendRow(tableName, newRow);

        return Response.json({
            status: "success",
            message: "Row created successfully",
            row_id: result._id
        }, { status: 200 });

    } catch (error) {
        console.error("SeaTable Error:", error);
        return Response.json({
            status: "error",
            message: error.message
        }, { status: 500 });
    }
}