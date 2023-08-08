const receipt = (accountholderName, balance, moneyDeduct) => {
    const msg = `
                  Receipt
      *******************************
      
        A/C Holder Name: ${accountholderName}
        ----------------------
        Money Deduct: ${moneyDeduct}
        ----------------------
        Available Balance: ${balance}
          
      *******************************
      `;
    return msg;
};
export default receipt;
