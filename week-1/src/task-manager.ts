import { readFile, writeFile, access } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { Task } from "./types.js";
/**
 * Get current directory (__dirname equivalent in ES Module).
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Absolute path to tasks.json
 */
const TASKS_FILE = path.join(__dirname, "../tasks.json");