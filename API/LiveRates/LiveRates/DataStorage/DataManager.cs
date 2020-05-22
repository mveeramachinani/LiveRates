using LiveRates.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace LiveRates.DataStorage
{
    public class DataManager
    {
        public static List<RatesResponse> GetData()
        {
            var result = Task.Run<List<RatesResponse>>(async () => await GetLiveRates()).Result;

            return result;
        }

        public static async Task<List<RatesResponse>> GetLiveRates()
        {
            string baseUrl = "https://www.live-rates.com/rates";

            try
            {
                var ratesResponse = await Get<RatesResponse>(baseUrl);
          
                return ratesResponse;
            }
            catch (Exception ex)
            {
                throw new NullReferenceException();
            }
        }

        internal static async Task<List<TResult>> Get<TResult>(string url)
        {
            using (var client = GetHttpRequest())
            using (var response = await client.GetAsync(url))
            {
                if (response != null && response.Content != null && response.StatusCode == HttpStatusCode.OK)
                {
                    //var content = await response.Content.ReadAsStringAsync();

                    var content = "[{ 'currency':'EUR/USD','rate':'1.08989','bid':'1.08989','ask':'1.08998','high':'1.09533','low':'1.08851','open':'1.09492','close':'1.08989','timestamp':'1590176574673'},{ 'currency':'GBP/USD','rate':'1.21715','bid':'1.21715','ask':'1.21731','high':'1.22331','low':'1.2161','open':'1.22219','close':'1.21715','timestamp':'1590176564766'},{ 'currency':'GBP/HUF','rate':'390.77','bid':'390.77','ask':'391.32','high':'392.18','low':'388.09','open':'388.35','close':'390.77','timestamp':'1590176577432'}]";

                    if (response.IsSuccessStatusCode == false)
                    {
                        throw new NullReferenceException("No results could be found for your query.");
                    }

                    return JsonConvert.DeserializeObject<List<TResult>>(content);

                }

                throw new NullReferenceException("An error occured while sending an sms.");
            }
        }


        internal static HttpClient GetHttpRequest()
        {
            try
            {
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                return client;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
