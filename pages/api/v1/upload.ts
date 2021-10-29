import HttpStatus from 'http-status-codes'
import middleware from '~@utils/middleware'
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

const handler = nextConnect();

handler.use(middleware);

handler.post(async(req: NextApiRequest & {files?: formidable.Files}, res: NextApiResponse) => {
	try {
		const files = req.files
		const body = req.body
		// do stuff with files and body
    res.status(HttpStatus.NO_CONTENT);
	} catch (err) {
		res.status(HttpStatus.BAD_REQUEST).json({error: (err as Error).message});
	}
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;