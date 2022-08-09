/**
 * Represents a single question.
 */
export interface Question {
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
