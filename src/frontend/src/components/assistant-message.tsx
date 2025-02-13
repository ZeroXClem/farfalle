import { AssistantMessage } from "@/types";
import { MessageComponent, MessageComponentSkeleton } from "./message";
import RelatedQuestions from "./related-questions";
import { SearchResultsSkeleton, SearchResults } from "./search-results";
import { Section } from "./section";

export const AssistantMessageContent = ({
  message,
  isStreaming = false,
  onRelatedQuestionSelect,
}: {
  message: AssistantMessage;
  isStreaming?: boolean;
  onRelatedQuestionSelect: (question: string) => void;
}) => {
  const { sources, content, relatedQuestions, images } = message;
  return (
    <div className="flex flex-col">
      <Section title="Sources" animate={isStreaming}>
        {!sources || sources.length === 0 ? (
          <SearchResultsSkeleton />
        ) : (
          <SearchResults results={sources} />
        )}
      </Section>
      <Section title="Answer" animate={isStreaming} streaming={isStreaming}>
        {content ? (
          <MessageComponent message={message} isStreaming={isStreaming} />
        ) : (
          <MessageComponentSkeleton />
        )}
        {images && images.length > 0 && (
          <div className="my-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
            {images.map((image) => (
              <a
                key={image}
                href={image}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-video w-full h-full overflow-hidden hover:scale-[1.03] duration-150 rounded-lg transition-all shadow-md"
              >
                <img
                  src={image}
                  className="w-full object-cover object-top h-full max-h-[80vh]"
                />
              </a>
            ))}
          </div>
        )}
      </Section>
      {relatedQuestions && relatedQuestions.length > 0 && (
        <Section title="Related" animate={isStreaming}>
          <RelatedQuestions
            questions={relatedQuestions}
            onSelect={onRelatedQuestionSelect}
          />
        </Section>
      )}
    </div>
  );
};
