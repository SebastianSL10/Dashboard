import React from 'react';

const Header = ({ category, title }) => (
  <div className=" mb-10 ml-4">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900 mt-4">
      {title}
    </p>
  </div>
);

export default Header;
