// AVAIMET POIS LOKISTA (Päätoimittaja 7.10. 06.4x): Cesiumin tiilivirheet kirjaavat koko osoitteen, jossa Googlen avain on
// kyselyparametrina (key=AIza…). CLAUDE.md: avaimia ei koskaan lokiin. Peitto tehdään ennen kirjoitusta (LokiSuodatin):
// avaimen ja tunnuksen kaltaisten parametrien arvo → ***.
using System.Text.RegularExpressions;

namespace Matkakirja.Linssit
{
    public static class LokiPeitto
    {
        static readonly Regex Parametri = new Regex(@"(?i)\b(key|access_token|api_key|apikey|token|xi-api-key)=([^&\s""'<>]+)", RegexOptions.Compiled | RegexOptions.CultureInvariant);

        /// <summary>Teksti ilman avainten arvoja; muuttumaton, jos peitettävää ei ole (nopea polku ilman regexiä).</summary>
        public static string Peita(string s)
        {
            if (string.IsNullOrEmpty(s) || s.IndexOf('=') < 0) return s;
            return Parametri.Replace(s, m => m.Groups[1].Value + "=***");
        }
    }
}
