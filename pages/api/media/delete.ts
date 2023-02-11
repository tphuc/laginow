import imagekit from '@/server/imagekit';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';



export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(404).end();

    let { id } = req.body;
    try {
        let response = await imagekit.deleteFile(id)


        return res.json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



export default handler;
