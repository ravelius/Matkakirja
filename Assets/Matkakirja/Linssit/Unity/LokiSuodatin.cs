// AVAIMET POIS LOKISTA (Päätoimittaja 7.10. 06.4x): kaikki Debug.Log-rivit (myös Cesiumin natiivit, jotka tulevat
// UnityEngine.Debug.Login kautta) kulkevat tämän käsittelijän läpi, ja avainparametrien arvot peitetään ennen kirjoitusta.
// Application.logMessageReceived näkee jo peitetyn rivin.
using System;
using UnityEngine;

namespace Matkakirja.Linssit
{
    sealed class LokiSuodatin : ILogHandler
    {
        readonly ILogHandler alla;
        LokiSuodatin(ILogHandler alla) { this.alla = alla; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Asenna()
        {
            var nyt = Debug.unityLogger.logHandler;
            if (nyt is LokiSuodatin) return;
            Debug.unityLogger.logHandler = new LokiSuodatin(nyt);
        }

        public void LogFormat(LogType tyyppi, UnityEngine.Object konteksti, string muoto, params object[] arvot)
        {
            // Cesium ja omat rivit: muoto "{0}" + valmis teksti; peitetään sekä muoto että merkkijonoarvot.
            if (arvot != null)
                for (int i = 0; i < arvot.Length; i++)
                    if (arvot[i] is string s) arvot[i] = LokiPeitto.Peita(s);
            alla.LogFormat(tyyppi, konteksti, LokiPeitto.Peita(muoto), arvot);
        }

        public void LogException(Exception poikkeus, UnityEngine.Object konteksti) => alla.LogException(poikkeus, konteksti);
    }
}
