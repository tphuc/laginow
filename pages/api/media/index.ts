import { Writable } from 'stream';
import FormData from 'form-data';
import ImageKit from 'imagekit';

import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
const formidable = require('formidable');
const formidableConfig = {
    keepExtensions: true,
    maxFileSize: 10_000_000,
    maxFieldsSize: 10_000_000,
    maxFields: 7,
    allowEmptyFiles: false,
    multiples: false,
};

const imagekit = new ImageKit(
    {
        publicKey: process.env.IMAGEKIT_PUBLIC as string ?? 'public_Y7/ACQM6hrnl2g7h7HBWqItfkG8=',
        privateKey: process.env.IMAGEKIT_PRIVATE as string ?? 'private_j7Olr+1boqDog4XlXOMDfgam4f0=',
        urlEndpoint: "https://ik.imagekit.io/lagifood"
    }
);

function formidablePromise(
    req: NextApiRequest,
    opts?: Parameters<typeof formidable>[0]
): Promise<any> {
    return new Promise((accept, reject) => {
        const form = formidable(opts);

        form.parse(req, (err: any, fields: any, files: any) => {
            if (err) {
                return reject(err);
            }
            return accept({ fields, files });
        });
    });
}

const fileConsumer = <T = unknown>(acc: T[]) => {
    const writable = new Writable({
        write: (chunk, _enc, next) => {
            acc.push(chunk);
            next();
        },
    });

    return writable;
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(404).end();

    try {
        const chunks: never[] = [];

        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            // consume this, otherwise formidable tries to save the file to disk
            fileWriteStreamHandler: () => fileConsumer(chunks),
        });

        const { file } = files;

        const fileData = Buffer.concat(chunks); // or is it from? I always mix these up

        let response = await imagekit.upload({
            file: fileData,
            fileName: file.newFilename
        })



        return res.json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

export default handler;
