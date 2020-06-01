import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Markdown = styled(ReactMarkdown)`
  code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
  }

  pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
    margin-bottom: 16px;
    margin-top: 0;
    word-wrap: normal;
  }

  code,
  pre {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  }

  pre code {
    display: inline;
    font-size: 100%;
    line-height: inherit;
    background-color: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    max-width: auto;
    overflow: visible;
    white-space: pre;
    word-break: normal;
    word-wrap: normal;
  }

  ul {
    margin-bottom: 16px;
    margin-top: 0;
    padding-left: 2em;
  }

  li {
    word-break: break-all;
  }
`;

export default Markdown;
