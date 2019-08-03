import React from "react";

const kyberURL = 'https://widget.kyber.network/v0.7.0/?type=swap&mode=popup&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten&lang=en&theme=theme-emerald';

const openSwapPop = () => {
    window.open(kyberURL,'popup','width=800,height=800,scrollbars=no,resizable=no'); 
}

export default () => (
  <>
    <a 
        title='Swap tokens'
        onClick={openSwapPop}
        target='popup' rel="noopener noreferrer">Swap tokens</a>
  </>
);
