import { promises as fs, existsSync } from "fs";

const uploadDir = "uploads";

export default class FileService {
  file: File;
  filePath: string;

  constructor(file: File) {
    this.file = file;
    const name = file.name.split(".");
    const ext = name[name.length - 1];
    name[name.length - 1] = `${this.getUniqueName()}.${ext}`;
    this.filePath = `/${uploadDir}/${name
      .join("_")
      .replaceAll(" ", "_")
      .toLowerCase()}`;
  }

  getUniqueName() {
    const str = Math.random().toString(36).substring(2, 15);

    return `${Date.now()}_${str}`;
  }

  async upload(path?: string) {
    path = path ?? `${process.cwd()}/public${this.filePath}`;

    return this.file
      .arrayBuffer()
      .then((buffer) => fs.writeFile(path, Buffer.from(buffer)));
  }

  static async removeFile(filePath: string) {
    const path = `${process.cwd()}/public${filePath}`;

    if (!existsSync(path)) {
      return false;
    }

    return fs.unlink(path);
  }
}
