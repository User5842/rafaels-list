/**
 * Represents props for the `Progress` component.
 */
export interface ProgressProps {
  /**
   * Amount of easy questions.
   */
  readonly easyCount: number | undefined;

  /**
   * Amount of medium questions.
   */
  readonly mediumCount?: number | undefined;

  /**
   * Amount of hard questions.
   */
  readonly hardCount?: number | undefined;
}
