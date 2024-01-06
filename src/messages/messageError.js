const MessageErrorEmpyt = (res, message, statuserror) => {
    return res
      .status(statuserror)
      .json({ message: message || "Something goes wrong retrivering task" });
  };
  
  module.exports = MessageErrorEmpyt;