import { baseUrl, apiURL } from "@/config/domain";

export const apiData = [
    {
        title: "Tags",
        details: [
            {
                actions: {
                    title: 'List tags',
                    method: "GET",
                    id: 'get-tags',
                    href: `${baseUrl}/docs/api/get-tags`,
                    apiLink: `${apiURL}tags`,
                    description: 'Get all the list of the gat',
                    response: {
                        success: true,
                        data: [
                            [
                                {
                                    "tagId": "clmpvd9xu0000vc55w21z17ab",
                                    "slug": "test-1",
                                    "name": "Test 1",
                                    "createdAt": "2023-09-19T05:23:19.314Z",
                                    "updatedAt": "2023-09-19T05:23:19.314Z"
                                },
                                {
                                    "tagId": "clmqiqlwe0000vctprz27db1n",
                                    "slug": "test-2",
                                    "name": "Test 2",
                                    "createdAt": "2023-09-19T16:17:32.510Z",
                                    "updatedAt": "2023-09-19T16:17:32.510Z"
                                },
                                {
                                    "tagId": "clmqiqrod0001vctpqxaec3no",
                                    "slug": "test-3",
                                    "name": "Test",
                                    "createdAt": "2023-09-19T16:17:39.997Z",
                                    "updatedAt": "2023-09-19T16:17:39.997Z"
                                }
                            ]
                        ]
                    }
                },
            },
        ],
    },
];
