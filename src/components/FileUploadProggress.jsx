function FileUploadProggress() {
  return (
    <div class='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-800 dark:border-gray-700'>
      <div class='p-4 md:p-5 space-y-7'>
        <div>
          {/* <!-- Uploading File Content --> */}
          <div class='mb-2 flex justify-between items-center'>
            <div class='flex items-center gap-x-3'>
              <span class='size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700'>
                <svg
                  class='flex-shrink-0 size-5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                  <polyline points='17 8 12 3 7 8'></polyline>
                  <line x1='12' x2='12' y1='3' y2='15'></line>
                </svg>
              </span>
              <div>
                <p class='text-sm font-medium text-gray-800 dark:text-white'>
                  preline-ui.html
                </p>
                <p class='text-xs text-gray-500 dark:text-gray-500'>7 KB</p>
              </div>
            </div>
            <div class='inline-flex items-center gap-x-2'>
              <svg
                class='flex-shrink-0 size-4 text-teal-500'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'></path>
              </svg>
              <a class='text-gray-500 hover:text-gray-800' href='#'>
                <svg
                  class='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M3 6h18'></path>
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                  <line x1='10' x2='10' y1='11' y2='17'></line>
                  <line x1='14' x2='14' y1='11' y2='17'></line>
                </svg>
              </a>
            </div>
          </div>
          {/* <!-- End Uploading File Content --> */}

          {/* <!-- Progress Bar --> */}
          <div
            class='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700'
            role='progressbar'
            aria-valuenow='100'
            aria-valuemin='0'
            aria-valuemax='100'
          >
            <div
              class='flex flex-col justify-center rounded-full overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap transition duration-500'
              style='width: 100%'
            ></div>
          </div>
          {/* <!-- End Progress Bar --> */}
        </div>

        <div>
          {/* <!-- Uploading File Content --> */}
          <div class='mb-2 flex justify-between items-center'>
            <div class='flex items-center gap-x-3'>
              <span class='size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700'>
                <svg
                  class='flex-shrink-0 size-5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                  <polyline points='17 8 12 3 7 8'></polyline>
                  <line x1='12' x2='12' y1='3' y2='15'></line>
                </svg>
              </span>
              <div>
                <p class='text-sm font-medium text-gray-800 dark:text-white'>
                  preline-ui.mp4
                </p>
                <p class='text-xs text-gray-500 dark:text-gray-500'>105.5 MB</p>
              </div>
            </div>
            <div class='inline-flex items-center gap-x-2'>
              <a class='text-gray-500 hover:text-gray-800' href='#'>
                <svg
                  class='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <rect width='4' height='16' x='6' y='4'></rect>
                  <rect width='4' height='16' x='14' y='4'></rect>
                </svg>
              </a>
              <a class='text-gray-500 hover:text-gray-800' href='#'>
                <svg
                  class='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M3 6h18'></path>
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                  <line x1='10' x2='10' y1='11' y2='17'></line>
                  <line x1='14' x2='14' y1='11' y2='17'></line>
                </svg>
              </a>
            </div>
          </div>
          {/* <!-- End Uploading File Content --> */}

          {/* <!-- Progress Bar --> */}
          <div
            class='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700'
            role='progressbar'
            aria-valuenow='25'
            aria-valuemin='0'
            aria-valuemax='100'
          >
            <div
              class='flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500'
              style='width: 25%'
            ></div>
          </div>
          {/* <!-- End Progress Bar --> */}
        </div>

        <div>
          {/* <!-- Uploading File Content --> */}
          <div class='mb-2 flex justify-between items-center'>
            <div class='flex items-center gap-x-3'>
              <span class='size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700'>
                <svg
                  class='flex-shrink-0 size-5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                  <polyline points='17 8 12 3 7 8'></polyline>
                  <line x1='12' x2='12' y1='3' y2='15'></line>
                </svg>
              </span>
              <div>
                <p class='text-sm font-medium text-gray-800 dark:text-white'>
                  preline-ui-cover.jpg
                </p>
                <p class='text-xs text-gray-500 dark:text-gray-500'>55 KB</p>
              </div>
            </div>
            <div class='inline-flex items-center gap-x-2'>
              <a class='text-gray-500 hover:text-gray-800' href='#'>
                <svg
                  class='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <rect width='4' height='16' x='6' y='4'></rect>
                  <rect width='4' height='16' x='14' y='4'></rect>
                </svg>
              </a>
              <a class='text-gray-500 hover:text-gray-800' href='#'>
                <svg
                  class='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M3 6h18'></path>
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                  <line x1='10' x2='10' y1='11' y2='17'></line>
                  <line x1='14' x2='14' y1='11' y2='17'></line>
                </svg>
              </a>
            </div>
          </div>
          {/* <!-- End Uploading File Content --> */}

          {/* <!-- Progress Bar --> */}
          <div
            class='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700'
            role='progressbar'
            aria-valuenow='100'
            aria-valuemin='0'
            aria-valuemax='100'
          >
            <div
              class='flex flex-col justify-center rounded-full overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap transition duration-500'
              style='width: 100%'
            ></div>
          </div>
          {/* <!-- End Progress Bar --> */}
        </div>
      </div>
      {/* <!-- End Body --> */}

      {/* <!-- Footer --> */}
      <div class='bg-gray-50 border-t border-gray-200 rounded-b-xl py-2 px-4 md:px-5 dark:bg-white/[.05] dark:border-gray-700'>
        <div class='flex flex-wrap justify-between items-center gap-x-3'>
          <div>
            <span class='text-sm font-semibold text-gray-800 dark:text-white'>
              1 left
            </span>
          </div>
          {/* <!-- End Col --> */}

          <div class='-me-2.5'>
            <button
              type='button'
              class='py-2 px-3 inline-flex items-center gap-x-1.5 text-sm font-medium rounded-lg border border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              <svg
                class='flex-shrink-0 size-4'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <rect width='4' height='16' x='6' y='4'></rect>
                <rect width='4' height='16' x='14' y='4'></rect>
              </svg>
              Pause
            </button>
            <button
              type='button'
              class='py-2 px-3 inline-flex items-center gap-x-1.5 text-sm font-medium rounded-lg border border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              <svg
                class='flex-shrink-0 size-4'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path d='M3 6h18'></path>
                <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                <line x1='10' x2='10' y1='11' y2='17'></line>
                <line x1='14' x2='14' y1='11' y2='17'></line>
              </svg>
              Delete
            </button>
          </div>
          {/* <!-- End Col --> */}
        </div>
      </div>
      {/* <!-- End Footer --> */}
    </div>
    // <!-- End File Uploading Progress Form -->
  );
}

export default FileUploadProggress;
