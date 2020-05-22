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
                    var content = await response.Content.ReadAsStringAsync();

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
