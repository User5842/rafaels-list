import { Question } from "./Question.interface";

/**
 * Represents the question data.
 */
export interface Data {
  /**
   * List of Easy questions.
   */
  readonly easy: Array<Question>;

  /**
   * List of Medium questions.
   */
  readonly medium: Array<Question>;

  /**
   * List of Hard questions.
   */
  readonly hard: Array<Question>;
}
