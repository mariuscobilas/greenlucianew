export async function POST(req) {
    try {
        const formData = await req.json();

        // Get Bearer
        const getTokenUrl = 'https://cloud.seatable.io/api/v2.1/dtable/app-access-token/?exp=1h';
        const getTokenOptions = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${process.env.SEATABLE_API_KEY}`
            }
        };

        const responseGetToken = await fetch(getTokenUrl, getTokenOptions);
        const tokenData = await responseGetToken.json();
        const accessToken = tokenData.access_token;

        // Add new Row
        const newRow = {
            "FirstName": formData.firstName,
            "LastName": formData.lastName,
            "Email": formData.email,
            "Organisation": formData.organisation,
            "Status": "New",
            "Submission Date": new Date().toISOString()
        };

        const addRowUrl = 'https://cloud.seatable.io/api-gateway/api/v2/dtables/308d588a-b7ef-44ed-8edb-ad0ac10f9ad2/rows/';
        const addRowOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                rows: [newRow],
                table_name: 'Table1'
            }),
        };

        const addRowResponse = await fetch(addRowUrl, addRowOptions);
        const addRowData = await addRowResponse.json();

        console.log("Row added:", addRowData);

        return Response.json({
            status: "success",
            message: "Row created successfully",
            data: addRowData
        }, { status: 200 });

    } catch (error) {
        console.error("SeaTable Error:", error.message);
        return Response.json({
            status: "error",
            message: error.message
        }, { status: 500 });
    }
}