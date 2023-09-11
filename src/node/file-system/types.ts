export interface ListBaseOpt {
  /** The absolute path of the target folder. */
  folderPath: string,

  getFullPath?: boolean,
}

export interface ListFoldersOpt extends ListBaseOpt {}

export interface ListFilesOpt extends ListBaseOpt {
  /**
   * If provided, only files with these extensions will be processed.
   *
   * @example
   * ['.css', '.html'];
   */
  filter?: string[],
}

export interface RemoveFilesOpt extends Omit<ListFilesOpt, 'getFullPath'> {}
