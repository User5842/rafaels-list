import { Question } from "./Question.interface";

/**
 * Represents the question data.
 */
export interface Data {
  /**
   * List of Easy questions.
   */
  easy: Array<Question>;

  /**
   * List of Medium questions.
   */
  medium: Array<Question>;

  /**
   * List of Hard questions.
   */
  hard: Array<Question>;

  /**
   * Index signature used to add questions during page load.
   */
  [key: string]: Array<Question>;
}
