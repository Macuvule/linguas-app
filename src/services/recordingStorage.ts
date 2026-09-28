import {
  Directory,
  File,
  Paths,
} from "expo-file-system";

const RECORDINGS_DIRECTORY = new Directory(
  Paths.document,
  "recordings"
);

/**
 * Garante que a pasta de gravações existe.
 */
export function ensureRecordingsDirectory(): void {
  if (!RECORDINGS_DIRECTORY.exists) {
    RECORDINGS_DIRECTORY.create();
  }
}

/**
 * Guarda permanentemente uma gravação.
 *
 * Recebe a URI temporária produzida pelo gravador
 * e copia o arquivo para a pasta persistente da aplicação.
 */
export async function saveRecordingFile(
  sourceUri: string
): Promise<string> {
  ensureRecordingsDirectory();

  console.log(
    "URI temporário recebido:",
    sourceUri
  );

  const fileName = `recording_${Date.now()}.m4a`;

  const destination = new File(
    RECORDINGS_DIRECTORY,
    fileName
  );

  const source = new File(sourceUri);

  console.log(
    "Origem existe?",
    source.exists
  );

  console.log(
    "Destino antes do copy:",
    destination.exists
  );

  // AGORA esperamos a cópia terminar
  await source.copy(destination);

  console.log(
    "Arquivo copiado para:",
    destination.uri
  );

  console.log(
    "Destino depois do copy:",
    destination.exists
  );

  return destination.uri;
}

/**
 * Verifica se o arquivo existe.
 */
export function recordingFileExists(
  uri: string
): boolean {
  const file = new File(uri);

  return file.exists;
}

/**
 * Apaga fisicamente o arquivo.
 */
export function deleteRecordingFile(
  uri: string
): void {
  const file = new File(uri);

  if (file.exists) {
    file.delete();
  }
}