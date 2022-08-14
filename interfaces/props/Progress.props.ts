/**
 * Represents props for the `Progress` component.
 */
export interface ProgressProps {
  /**
   * Amount of easy questions.
   */
  readonly easyCount: number;

  /**
   * Amount of medium questions.
   */
  readonly mediumCount?: number;

  /**
   * Amount of hard questions.
   */
  readonly hardCount?: number;
}
