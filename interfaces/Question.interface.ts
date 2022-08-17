/**
 * Represents a single question.
 */
export interface Question {
  /**
   * Question difficulty.
   */
  readonly difficulty: string;

  /**
   * Unique identifier for this question.
   */
  readonly id: string;

  /**
   * Link to the LeetCode question.
   */
  readonly link: string;

  /**
   * Name of the LeetCode question.
   */
  readonly name: string;

  /**
   * List of related topics.
   */
  readonly topics: Array<string>;

  /**
   * Link of the video stream section.
   */
  readonly video: string;
}
