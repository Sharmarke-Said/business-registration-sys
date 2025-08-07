const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 p-6 text-gray-600">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {currentYear} BusinessReg. All rights reserved.</p>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          <li>
            <a href="#" className="hover:text-blue-600">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
