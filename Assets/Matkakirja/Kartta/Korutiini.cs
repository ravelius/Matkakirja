using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Korutiini samassa kehyksessä (löydös 134, Pelikoodari 25.9.2026): Unity kuluttaa kehyksen jokaiseen sisäkkäiseen
    /// <c>yield return IEnumerator</c>-kutsuun, vaikka sisempi päättyisi heti (välimuistissa oleva data). Nostokortin avaus
    /// kulki kuuden sisäkkäisen haun läpi ja odotti 6 kehystä (100–230 ms) ilman ainuttakaan verkkohakua.
    /// <see cref="Kaynnista"/> ajaa rungon heti, kunnes se oikeasti odottaa (null, WaitFor…, verkkopyyntö); vasta silloin
    /// loppu jatkuu tavallisena korutiinina samasta kohdasta. Sisäkkäiset IEnumeratorit ajetaan pinossa kuten Unity.
    /// </summary>
    public static class Korutiini
    {
        /// <summary>Ajaa heti; palauttaa käynnistetyn jatkon tai null, jos kaikki valmistui tässä kehyksessä.</summary>
        public static Coroutine Kaynnista(MonoBehaviour isanta, IEnumerator runko)
        {
            var pino = new Stack<IEnumerator>();
            pino.Push(runko);
            object odotus;
            // Poikkeus rungossa kirjataan kuten Unityn korutiinissa eikä kaada kutsujaa (esim. kosketuksen käsittelyä).
            try { odotus = Aja(pino); }
            catch (System.Exception e) { Debug.LogException(e); return null; }
            return pino.Count == 0 ? null : isanta.StartCoroutine(Jatko(pino, odotus));
        }

        /// <summary>Etenee, kunnes pino tyhjenee tai kohdataan oikea odotus (palautetaan).</summary>
        static object Aja(Stack<IEnumerator> pino)
        {
            while (pino.Count > 0)
            {
                var e = pino.Peek();
                if (!e.MoveNext()) { pino.Pop(); continue; }
                if (e.Current is IEnumerator sisa) { pino.Push(sisa); continue; }
                return e.Current;
            }
            return null;
        }

        static IEnumerator Jatko(Stack<IEnumerator> pino, object odotus)
        {
            yield return odotus;
            while (pino.Count > 0)
            {
                var seuraava = Aja(pino);
                if (pino.Count == 0) yield break;
                yield return seuraava;
            }
        }
    }
}
