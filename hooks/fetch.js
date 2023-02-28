import axios from "axios";
// import React, { useState, useCallback, useEffect } from "react";

const useFetch = async (method, url, reqData, option) => {
  // console.log(reqData);
  try {
    const response = await axios({
      method: method,
      url: url,
      data: reqData,
      headers: {
        "sameSite": "Strict",
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }

  //   .then(function (response) {
  //     setData(response);
  //   })
  //   .catch(function (error) {
  //     setError(error);
  //   });
  // return { request, err };
};

export default useFetch;
