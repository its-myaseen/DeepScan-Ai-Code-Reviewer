import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import * as Select from "@radix-ui/react-select";
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
import ReactMarkdown from "react-markdown";
import Lottie from 'lottie-react'
import loader from '../assets/Loading.json'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const menuItems = [
  "Python",
  "JavaScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Assembly Language",
  "Rust",
];

const AppReview = () => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [width, setWidth] = useState('0px');
  let screenWidth = window.innerWidth

  // Handle clipboard paste 
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setInput(clipboardText);
    } catch (err) {
      setError('Failed to read clipboard: ' + err);
      setAlert(true);
    }
  };

  // Prism highlight refresh
  useEffect(() => {
    Prism.highlightAll();
  }, [input]);

  const baseurl = import.meta.env.VITE_Backend_Base_Url;

  // Send code for review
  const sendHandler = async (e) => {
    e.preventDefault();
    setOutput('');

    if (input.length < 3) {
      setError('Code is required to review!');
      setAlert(true);
      return;
    }
    if (lang === '') {
      setError('Please select language to review!');
      setAlert(true);
      return;
    }

    if (screenWidth >= 769) {
      setWidth('50%');
    } else if (screenWidth <= 768) {
      setWidth('100%')
    }

    setIsProcessing(true);

    axios.post(`${baseurl}/openai/response/review`, {
      code: input,
      lang: lang
    }).then((res) => {
      setOutput(res.data.review);
      setIsProcessing(false);
    }).catch((err) => {
      setError('An Error Occurred: ' + err + `${'\n'}It is possible that your backend server is not active or you have entered a wrong base url in your env`);
      setAlert(true);
      setIsProcessing(false);
      setWidth('0px');
    });
  };

  const closeAlert = () => {
    setAlert(false);
    setError('');
  };

  const lines = input.split('\n').length;
  const bytes = new TextEncoder().encode(input).length;

  return (
    <div className='block relative w-screen h-screen overflow-auto md:overflow-hidden bg-black'>
      <Navbar />
      <div className='flex flex-col md:flex-row justify-start md:justify-center items-start lg:items-end px-5 gap-3 py-5 w-full bg-[#0e0e0e] border-t border-gray-600' style={{ height: 'calc(100vh - 80px)' }}>
        {/* Editor Container */}
        <div className='block relative w-[100%] md:flex-1 h-[50%] md:h-full bg-black rounded-lg border border-[#1d1d1d] overflow-hidden duration-300'>
          {/* Navigation */}
          <div className='flex justify-end sm:justify-between items-center relative h-12 w-full pl-5 pr-2 bg-[#0a0a0a] border-b border-[#1d1d1d]'>
            <div className='hidden sm:flex justify-start gap-2 items-center box-border'>
              <h1 className='block relative text-[10px] text-[#6e6e6e]'>{lines} lines</h1>
              <p className=' hidden lg:block relative text-[10px] text-gray-600'>/</p>
              <h1 className='hidden lg:block relative text-[10px] text-[#6e6e6e]' aria-label='bytes'>{bytes} bytes</h1>
            </div>
            <div className='flex justify-end items-center gap-2 lg:gap-5'>
              <button onClick={handlePaste} className='block relative text-md text-[#919191] hover:text-[#b4b4b4] cursor-pointer' title="Paste from clipboard"><i className="ri-clipboard-line"></i></button>
              <Select.Root value={lang} onValueChange={setLang}>
                <div className="w-35 sm:w-50 max-w-full">
                  <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-[6px] text-[11px] lg:text-sm text-gray-500 bg-black rounded-md shadow-sm outline-none">
                    <Select.Value placeholder="Select Language" />
                    <Select.Icon className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content position="popper" avoidCollisions={false} className="w-[var(--radix-select-trigger-width)] mt-3 overflow-y-auto bg-black border rounded-lg shadow-sm shadow-gray-100/20 text-sm">
                      <Select.Viewport>
                        {menuItems.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </div>
              </Select.Root>
              <button onClick={sendHandler} type="button" className="flex items-center justify-center font-medium text-[10px] lg:text-[13px] px-5 py-[0.7em] lg:py-[0.5em] text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] border-none tracking-[0.05em] rounded-sm cursor-pointer font-inherit group focus:outline-none active:opacity-70 duration-75" style={{ fontFamily: "inherit" }}>
                <svg height="15" width="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="hidden lg:block mr-[3px] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[5px] group-hover:rotate-[60deg] [transform:rotate(30deg)]">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"></path>
                </svg>
                <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[7px]">
                  Send
                </span>
              </button>
            </div>
          </div>
          {/* Editor */}
          <div className='block editorParrent relative overflow-y-auto' style={{ height: 'calc(100% - 48px )' }}>
            <Editor
              className="editor text-sm bg-transparent border-none w-full min-h-[200px] rounded-lg text-white caret-blue-400"
              value={input}
              onValueChange={setInput}
              highlight={code => Prism.highlight(code, Prism.languages.js, 'js')}
              padding={10}
              style={{ minHeight: '100%', width: '100%', outline: 'none' }}
            />

          </div>
        </div>
        {/* Review Container */}
        <div className='flex flex-col items-start relative w-full md:w-[50%] h-[50%] md:h-full bg-black rounded-lg overflow-hidden duration-600' style={{ width: width }}>
          {/* Navigation */}
          <div className='flex justify-between items-center relative h-12 w-full px-5 bg-[#0a0a0a] border-b border-[#1d1d1d]'>
            <div className='flex justify-start gap-2 items-center box-border'>
              <h1 className='block relative text-[10px] text-[#6e6e6e]'>{lines} lines</h1>
              <p className='block relative text-[10px] text-gray-600'>/</p>
              <h1 className='block relative text-[10px] text-[#6e6e6e]' aria-label='copy'>{bytes} bytes</h1>
            </div>
            <div className='flex justify-end items-center gap-5'>
              <button onClick={() => setWidth('0px')} className='block relative text-md text-[#919191] hover:text-[#b4b4b4] cursor-pointer'><i className="ri-close-circle-line"></i></button>
            </div>
          </div>
          {/* Review Block */}
          {isProcessing ? (
            <Lottie animationData={loader} loop={true} className='relative h-15 w-15 mx-auto top-1/2 -translate-y-[100%]' />
          ) : (
            <div className='block chat-message editorParrent relative overflow-y-auto flex-1 w-full text-white px-5 py-5 text-sm'>
              <ReactMarkdown
                children={output}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              />
            </div>
          )}
        </div>
      </div>
      {/* Alert Block */}
      {alert && (
        <div className="flex fixed bottom-5 left-5 flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
          <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
            <div className="flex gap-2">
              <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <div>
                <p className="text-white">Required Data Missing</p>
                <p className="text-gray-500">{error || 'Some required data is missing.'}</p>
              </div>
            </div>
            <button className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear" aria-label="Close" type="button" onClick={closeAlert}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// SelectItem for Radix Select
const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="flex items-center justify-between px-3 py-2 duration-150 text-gray-600 data-[state=checked]:text-blue-600 data-[highlighted]:text-blue-600  data-[highlighted]:hover:text-blue-600 outline-none cursor-pointer"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1">{children}</div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);

export default AppReview;