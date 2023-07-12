// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const filePath = path.join(process.cwd(), 'public/assets/files', 'statuts_et_texte_du_SYNES_final.pdf');

  const fileContents = fs.readFileSync(filePath);

  res.setHeader('Content-Disposition', 'attachment; filename=statuts_et_texte_du_SYNES_final.pdf');

  res.setHeader('Content-Type', 'application/pdf');

  res.send(fileContents);
}
