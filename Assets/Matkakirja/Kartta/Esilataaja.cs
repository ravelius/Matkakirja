using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>Esilatauksen prioriteetti (Raamattu ESILATAUSPOLITIIKKA: näkyvä > seuraava ruutu > tämä kaupunki > kohdekaupungit > muu).</summary>
    public enum Taso { Nakyva, SeuraavaRuutu, TamaKaupunki, Kohdekaupungit, Muu }

    /// <summary>
    /// ESILATAAJA (Pelikoodari, erä 1; suunnitelma docs/raportit/esilataaja-suunnitelma-20260925.md, Fable hyväksyi 25.9.).
    /// Yksi jono verkkohauille, joita ei ladata laattapalvelimen kautta (sisältö, kuvat, puhe, linssien aineisto):
    ///   - Rinnakkain enintään <see cref="Rinnakkain"/>. Nakyva-taso lähtee aina heti (ohittaa jonon ja paikat); muut
    ///     jonottavat tason ja saapumisjärjestyksen mukaan, ja yksi paikka jää aina näkyvälle.
    ///   - Taustataso (TamaKaupunki ja alemmat) odottaa, kun näkyvän kartan laattoja on haussa (Laattapalvelin.Kiireinen):
    ///     laatoilla on oma jononsa (Natiiviseppä), joten "näkyvä ohittaa taustan" pätee myös niihin.
    ///   - Uusinta: 429, 5xx ja yhteysvirheet (myös aikakatkaisu) uusitaan 1, 2, 4 ja 8 s:n viiveellä; Retry-After voittaa.
    ///     404 ja 403 eivät uusi.
    ///   - Jokainen yritys kirjataan VerkkoOdotus.Haku-summiin (lähde, ms, tavut).
    /// Kutsuja luo pyynnön (luo) jokaiselle yritykselle erikseen ja lukee tuloksen valmis-kutsussa ennen vapautusta.
    /// Erä 1 ei lisää uutta esilatausta: se on mittauspohja (osuma-% VerkkoOdotus.Osuma).
    /// </summary>
    public sealed class Esilataaja : MonoBehaviour
    {
        public const int Rinnakkain = 6;
        static readonly float[] Viiveet = { 1f, 2f, 4f, 8f };

        sealed class Odottaja
        {
            public Taso Taso; public long Nro; public bool Saa, Vapautettu;
            /// <summary>Käynnissä oleva yritys, tai null tauolla / ennen ensimmäistä yritystä.</summary>
            public UnityWebRequest Pyynto;
            /// <summary>Ilman pyyntöä paikka on laillisesti varattu tähän hetkeen asti (tauko, vuoron alku).</summary>
            public float Odottaa;
            public float ValmisAika;
        }

        static Esilataaja instanssi;
        static readonly List<Odottaja> jono = new List<Odottaja>();
        /// <summary>
        /// Paikan saaneet. StopCoroutine (esim. Puhe.Soita katkaisee latauksen) ei aja finallya, joten Update vapauttaa
        /// paikan, jonka coroutine on kuollut: pyyntö valmis yli 2 s ilman jatkoa, tai tauko/vuoro umpeutunut.
        /// </summary>
        static readonly List<Odottaja> aktiiviset = new List<Odottaja>();
        static int kaynnissa;
        static long nro;

        /// <summary>Tilastot: käynnissä, jonossa, uusintoja yhteensä.</summary>
        public static int Kaynnissa => kaynnissa;
        public static int Jonossa => jono.Count;
        public static int Uusintoja { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            instanssi = null;
            jono.Clear();
            aktiiviset.Clear();
            kaynnissa = 0;
            nro = 0;
            Uusintoja = 0;
        }

        static void Varmista()
        {
            if (instanssi != null) return;
            var go = new GameObject("Esilataaja");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<Esilataaja>();
        }

        /// <summary>
        /// Hakee (luo) jonon kautta; valmis(r) saa viimeisen yrityksen pyynnön ennen sen vapautusta (r.result kertoo,
        /// onnistuiko). Pääsäikeestä coroutinena: <c>yield return Esilataaja.Hae(...)</c>.
        /// </summary>
        public static IEnumerator Hae(Func<UnityWebRequest> luo, Taso taso, string lahde, Action<UnityWebRequest> valmis)
        {
            Varmista();
            var o = new Odottaja { Taso = taso, Nro = nro++ };
            if (taso != Taso.Nakyva)
            {
                jono.Add(o);
                while (!o.Saa) yield return null;
            }
            else Anna(o);
            try
            {
                for (int yritys = 0; ; yritys++)
                {
                    float viive;
                    using (var r = luo())
                    {
                        o.Pyynto = r;
                        float alku = Time.realtimeSinceStartup;
                        yield return r.SendWebRequest();
                        VerkkoOdotus.Haku(lahde, (Time.realtimeSinceStartup - alku) * 1000.0, (long)r.downloadedBytes);
                        if (r.result == UnityWebRequest.Result.Success || !Uusittava(r) || yritys >= Viiveet.Length)
                        {
                            valmis?.Invoke(r);
                            yield break;
                        }
                        viive = RetryAfter(r) ?? Viiveet[yritys];
                        Uusintoja++;
                        Debug.Log($"MATKAKIRJA esilataaja: {lahde} {r.responseCode} {r.error} → uusinta {yritys + 1} {viive:0.#} s ({Lyhenna(r.url)})");
                        o.Pyynto = null;
                        o.Odottaa = Time.realtimeSinceStartup + viive + 2f;
                    }
                    yield return new WaitForSecondsRealtime(viive);
                }
            }
            finally { Vapauta(o); }
        }

        static void Anna(Odottaja o)
        {
            o.Saa = true;
            o.Odottaa = Time.realtimeSinceStartup + 2f;
            kaynnissa++;
            aktiiviset.Add(o);
        }

        static void Vapauta(Odottaja o)
        {
            if (o.Vapautettu || !o.Saa) { jono.Remove(o); return; }
            o.Vapautettu = true;
            kaynnissa--;
            aktiiviset.Remove(o);
        }

        /// <summary>Kuolleiden coroutinejen paikat takaisin (ks. aktiiviset).</summary>
        static void Siivoa()
        {
            float nyt = Time.realtimeSinceStartup;
            for (int i = aktiiviset.Count - 1; i >= 0; i--)
            {
                var o = aktiiviset[i];
                bool kuollut;
                if (o.Pyynto != null)
                {
                    if (o.Pyynto.isDone && o.ValmisAika == 0) o.ValmisAika = nyt;
                    kuollut = o.ValmisAika > 0 && nyt - o.ValmisAika > 2f;
                }
                else kuollut = nyt > o.Odottaa;
                if (kuollut) Vapauta(o);
            }
        }

        static bool Uusittava(UnityWebRequest r) =>
            r.responseCode == 429 || r.responseCode >= 500 || r.result == UnityWebRequest.Result.ConnectionError;

        static float? RetryAfter(UnityWebRequest r)
        {
            var h = r.GetResponseHeader("Retry-After");
            return !string.IsNullOrEmpty(h) && float.TryParse(h, NumberStyles.Float, CultureInfo.InvariantCulture, out var s) && s >= 0
                ? Mathf.Min(s, 30f) : (float?)null;
        }

        static string Lyhenna(string url)
        {
            if (url == null) return "";
            int q = url.IndexOf('?');
            var polku = q > 0 ? url.Substring(0, q) : url;
            int v = polku.LastIndexOf('/');
            return v >= 0 ? polku.Substring(v + 1) : polku;
        }

        void Update()
        {
            VerkkoOdotus.PaivitaVaihe();
            if (aktiiviset.Count > 0) Siivoa();
            if (jono.Count == 0) return;
            bool laatatKiireessa = Laattapalvelin.Kiireinen;
            // Yksi paikka jää aina näkyvälle (Rinnakkain - 1 taustalle).
            while (kaynnissa < Rinnakkain - 1)
            {
                int paras = -1;
                for (int i = 0; i < jono.Count; i++)
                {
                    var o = jono[i];
                    if (laatatKiireessa && o.Taso >= Taso.TamaKaupunki) continue;
                    if (paras < 0 || o.Taso < jono[paras].Taso || (o.Taso == jono[paras].Taso && o.Nro < jono[paras].Nro)) paras = i;
                }
                if (paras < 0) break;
                var valittu = jono[paras];
                jono.RemoveAt(paras);
                Anna(valittu);
            }
        }
    }
}
