using System;

namespace LiveRates.Models
{
    public class RatesResponse
    {
        public string Currency { get; set; }
        public decimal? Rate { get; set; }
        public decimal? Bid { get; set; }
        public decimal? Ask { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Open { get; set; }
        public decimal? Close { get; set; }
        public string Timestamp { get; set; }

        public RatesResponse(string currency, string rate, string bid, string ask, string high, string low, string open, string close, string timestamp)
        {
            Currency = currency;
            Rate = GetValue(rate);
            Bid = GetValue(bid);
            Ask = GetValue(ask);
            High = GetValue(high);
            Low = GetValue(low);
            Open = GetValue(open);
            Close = GetValue(close);
            Timestamp = timestamp;
        }

        private decimal? GetValue(string option)
        {
           return (!string.IsNullOrEmpty(option) && option != "n/a") ? Convert.ToDecimal(option) : (decimal?)null;
        }

    }
}
