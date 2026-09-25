using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>Verkkosäännön kohta (Raamattu ESILATAUSPOLITIIKKA 2–6); lokia ja mittaria varten.</summary>
    public enum Kohta { Kaynnistys = 2, Saapuminen = 3, Joutilas = 4, Ennakointi = 5, Linssi = 6 }

    /// <summary>Ladattava tiedosto (Siirtosepän paketin taustapäivitys: docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md).</summary>
    public sealed class Kohde
    {
        public string Osoite, Sha256, KohdePolku;
        /// <summary>Arvioitu koko (hakemiston siirto tai tavuja): vain edistymiseen ja lokiin.</summary>
        public long Tavuja;

        /// <summary>
        /// Tiedosto osoitteesta polkuun (absoluuttinen, tai suhteellinen persistentDataPath/sisalto:on). Keskeytynyt lataus
        /// jatkuu Range-pyynnöllä. Esilataaja ei tarkista sha256:ta: sen tekee kutsuja RyhmaValmis-kutsussa.
        /// </summary>
        public static Kohde Tiedosto(string osoite, string sha256, long tavuja, string kohdePolku) =>
            new Kohde { Osoite = osoite, Sha256 = sha256, Tavuja = tavuja, KohdePolku = kohdePolku };
    }

    /// <summary>
    /// ESILATAAJA, TIEDOSTOT JA RYHMÄT (erä 4; sovittu Siirtosepän kanssa 25.9., PR #3200): <see cref="Pyyda"/> jonottaa
    /// tiedoston tasolle, <see cref="RyhmaValmis"/> kutsuu, kun ryhmän kaikki tiedostot on yritetty (valmiit, virheet),
    /// <see cref="PeruRyhma"/> poistaa jonossa olevat. Jatkaminen: jokainen yritys kirjoittaa "&lt;polku&gt;.osa"-tiedostoon
    /// Range-otsakkeella nykyisen pituuden kohdalta; 206 liitetään perään, 200 korvaa, 416 = jo valmis. Edellisen istunnon
    /// keskeytynyt .osa liitetään ensimmäisellä yrityksellä (2xx-vastauksen alku); muuten keskeneräinen .osa on virhevastaus
    /// ja poistetaan. Kaikilla verkoilla; taso Muu pysähtyy kuumana ja virransäästössä (Raamattu, LÄMPÖ kohta 2).
    /// </summary>
    public sealed partial class Esilataaja
    {
        sealed class Ryhma
        {
            public int Jaljella, Valmiit, Virheet;
            public bool Peruttu;
            public readonly HashSet<string> Polut = new HashSet<string>();
            public readonly List<Action<int, int>> Kutsut = new List<Action<int, int>>();
        }

        static readonly Dictionary<string, Ryhma> ryhmat = new Dictionary<string, Ryhma>();
        public static int TiedostojaValmiina { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaTiedostot() { ryhmat.Clear(); TiedostojaValmiina = 0; }

        /// <summary>Jonottaa tiedoston ryhmään (sama polku samassa ryhmässä kerran). Pääsäikeestä.</summary>
        public static void Pyyda(Kohde k, Taso taso, Kohta kohta, string ryhma)
        {
            if (k == null || string.IsNullOrEmpty(k.Osoite) || string.IsNullOrEmpty(k.KohdePolku)) return;
            Varmista();
            ryhma ??= "";
            // Valmistunut ryhmä alkaa alusta (Siirtosepän uusi kierros samalla nimellä yrittää virheet uudelleen).
            if (!ryhmat.TryGetValue(ryhma, out var r) || r.Peruttu || (r.Jaljella == 0 && r.Polut.Count > 0)) ryhmat[ryhma] = r = new Ryhma();
            string polku = Path.IsPathRooted(k.KohdePolku) ? k.KohdePolku
                : Path.Combine(Application.persistentDataPath, "sisalto", k.KohdePolku.Replace('/', Path.DirectorySeparatorChar));
            if (!r.Polut.Add(polku)) return;
            r.Jaljella++;
            instanssi.StartCoroutine(LataaTiedosto(k.Osoite, polku, taso, kohta, ryhma, r));
        }

        /// <summary>
        /// Kutsu, kun ryhmän kaikki tiedostot on yritetty: (valmiit, virheet). Jos ryhmä on jo valmis, kutsutaan heti.
        /// Ryhmä ilman yhtään pyyntöä ei kutsu (odottaa ensimmäistä).
        /// </summary>
        public static void RyhmaValmis(string ryhma, Action<int, int> kutsu)
        {
            if (kutsu == null) return;
            ryhma ??= "";
            if (!ryhmat.TryGetValue(ryhma, out var r)) ryhmat[ryhma] = r = new Ryhma();
            if (r.Polut.Count > 0 && r.Jaljella == 0) { Kutsu(kutsu, r); return; }
            r.Kutsut.Add(kutsu);
        }

        /// <summary>Ryhmän jonossa olevat pois (käynnissä olevat valmistuvat); RyhmaValmis-kutsuja ei tehdä.</summary>
        public static void PeruRyhma(string ryhma)
        {
            if (ryhma != null && ryhmat.TryGetValue(ryhma, out var r)) { r.Peruttu = true; ryhmat.Remove(ryhma); }
        }

        static IEnumerator LataaTiedosto(string osoite, string polku, Taso taso, Kohta kohta, string ryhma, Ryhma r)
        {
            string osa = polku + ".osa";
            bool ensimmainen = true, ok = false;
            long alku = 0;
            Directory.CreateDirectory(Path.GetDirectoryName(polku));
            yield return Hae(() =>
            {
                if (r.Peruttu) return null;
                if (File.Exists(osa))
                {
                    // Ensimmäisellä yrityksellä edellisen istunnon keskeytynyt data (vastauksen alku), muuten virhevastaus.
                    if (ensimmainen) Liita(osa, polku); else File.Delete(osa);
                }
                ensimmainen = false;
                alku = File.Exists(polku) ? new FileInfo(polku).Length : 0;
                var q = new UnityWebRequest(osoite, UnityWebRequest.kHttpVerbGET) { downloadHandler = new DownloadHandlerFile(osa) { removeFileOnAbort = false }, timeout = 120 };
                if (alku > 0) q.SetRequestHeader("Range", $"bytes={alku}-");
                return q;
            }, taso, "tiedosto", q =>
            {
                if (q == null) return;
                try
                {
                    if (q.responseCode == 206 && alku > 0) { Liita(osa, polku); ok = true; }
                    else if (q.result == UnityWebRequest.Result.Success) { if (File.Exists(polku)) File.Delete(polku); File.Move(osa, polku); ok = true; }
                    else if (q.responseCode == 416 && alku > 0) { File.Delete(osa); ok = true; }
                    else if (File.Exists(osa)) File.Delete(osa);
                }
                catch (IOException e) { Debug.LogWarning("MATKAKIRJA esilataaja: tiedosto " + e.Message); ok = false; }
                if (!ok) Debug.Log($"MATKAKIRJA esilataaja: tiedosto {Lyhenna(osoite)} {q.responseCode} {q.error} ({kohta}, {ryhma})");
            });
            if (r.Peruttu) yield break;
            if (ok) { r.Valmiit++; TiedostojaValmiina++; } else r.Virheet++;
            if (--r.Jaljella > 0) yield break;
            Debug.Log($"MATKAKIRJA esilataaja: ryhmä {ryhma} valmis ({r.Valmiit} valmista, {r.Virheet} virhettä)");
            foreach (var k in r.Kutsut) Kutsu(k, r);
            r.Kutsut.Clear();
        }

        static void Kutsu(Action<int, int> k, Ryhma r)
        {
            try { k(r.Valmiit, r.Virheet); } catch (Exception e) { Debug.LogException(e); }
        }

        static void Liita(string osa, string polku)
        {
            using (var ulos = new FileStream(polku, FileMode.Append, FileAccess.Write))
            using (var sisaan = File.OpenRead(osa))
                sisaan.CopyTo(ulos);
            File.Delete(osa);
        }
    }
}
