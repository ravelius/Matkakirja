// KAUPUNKIKIERROS (Linssiseppä 5.10.2026; Lontoo-pilotti, Päätoimittaja, omistaja 16.3x/17.4x): Unity-osa. Lennon logiikka ja
// reitti ovat moottorittomassa ytimessä (Linssit/Ydin/Kierros), Cesium-näkymä yhteisessä CesiumKaupunki-luokassa (data, ehdot,
// tunnus, origo, esilatauskamera, krediitit) ja UI UI/Linssit/KierrosTaulu.cs:ssä (avausruutu, pysähdyksen nimi, kertojan teksti).
// Ajoitus: tekstitila (pysähdys tekstin mittainen, laattojen odotus). Äänitila (kertojan yksi otto ja saapumisajat ämpäristä)
// on ytimessä valmiina (KierrosLento.PaivitaAanella); elävä opas (OpasSovitin) korvasi valmiin esittelyn 5.10. 17.5x.
using System;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Kierros;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class KierrosSovitin : ILinssi
    {
        public static KierrosSovitin Viimeisin { get; private set; }
        /// <summary>UI kuuntelee: lento alkoi (sovitin) tai loppui (null).</summary>
        public static event Action<KierrosSovitin> Vaihtui;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly Kierros kierros;
        readonly CesiumKaupunki kaupunki;
        ILinssiYmparisto y;
        KierrosLento lento;
        int paivitetty = -1;
        float avattu;

        public KierrosSovitin(LinssiOhjain o, PalloKierto kierto, Kierros kierros)
        {
            this.o = o; this.kierto = kierto; this.kierros = kierros;
            kaupunki = new CesiumKaupunki(kierto, o.Kirjaa);
        }
        public Kierros Kierros => kierros;
        public LinssiTiedot Tiedot => kierros.Tiedot;
        public bool Auki => lento != null;
        public KierrosLento Lento => lento;
        /// <summary>Avauksen virhe (puuttuva tunnus); UI näyttää sen tilarivillä ja sulkee linssin.</summary>
        /// <summary>Avauksen virhe tai näkymän myöhempi virhe (tunnuksen haku Pöllöstä epäonnistui); UI näyttää sen ja sulkee linssin.</summary>
        public string Virhe { get => virhe ?? (nakymaAuki ? kaupunki.Virhe : null); private set => virhe = value; }
        string virhe;
        bool nakymaAuki;
        public float Latausaste => kaupunki.Latausaste;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            Virhe = null;
            Viimeisin = this;
            lento = new KierrosLento(kierros.Pysahdykset);
            if (!kaupunki.Avaa(kierros.OrigoLat, kierros.OrigoLon, kierros.OrigoKorkeusM))
            {
                Virhe = kierros.Tiedot.Nimi + ": " + kaupunki.Virhe;   // Auki = true, jotta UI ehtii sulkea linssin siististi
                Vaihtui?.Invoke(this);
                return;
            }
            nakymaAuki = true;
            avattu = Time.realtimeSinceStartup;
            if (kierto != null) SyoteLukko.Esta(this);   // pelaajan veto ei katkaise kuvausta
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Peite(true);
            o.StartCoroutine(PeitePois());   // simu 18.39: peite jäi päälle ja tummensi koko näkymän
            lento.Saapui += i => o.Kirjaa($"{Tiedot.Id}: saapui {i + 1}/{lento.Reitti.Count} {lento.Reitti[i].Id} ({Time.realtimeSinceStartup - avattu:F1} s avauksesta)");
            if (o.GetComponent<KyydinKameraEnnen>() == null) o.gameObject.AddComponent<KyydinKameraEnnen>();
            KyydinKameraEnnen.Ajo = PaivitaKamera;
            PaivitaKamera();
            Vaihtui?.Invoke(this);
            o.Kirjaa($"{Tiedot.Id}: data {kaupunki.Kaytossa}, auki, arvio {lento.ArvioituKesto():F0} s, {lento.Reitti.Count} pysähdystä");
        }

        /// <summary>LinssiOhjaimen Update: kamera on yleensä jo ajettu KyydinKameraEnnen-vaiheessa (kehysvahti).</summary>
        public void Paivita()
        {
            if (lento == null || Virhe != null) return;
            PaivitaKamera();
        }

        /// <summary>Kerran kehyksessä ennen Cesiumia: lennon tila, kamera ja esilatauskamera.</summary>
        void PaivitaKamera()
        {
            if (lento == null || Virhe != null || paivitetty == Time.frameCount) return;
            paivitetty = Time.frameCount;
            kaupunki.PidaMaski();
            kaupunki.PaivitaAvauslataus();   // ion-logo avauslatauksen ajan (Natiivi-UI KrediititTiivis)
            KrediititTiivis.Paivita(true);   // kapealla ruudulla logot + "Data sources" (Googlen policy)
            var ennen = lento.Vaihe;
            lento.Paivita(Time.unscaledDeltaTime, kaupunki.Valmis);
            if (lento.Vaihe != ennen) o.Kirjaa($"{Tiedot.Id}: {ennen} → {lento.Vaihe} ({lento.Indeksi + 1}), laatat {kaupunki.Latausaste:F0} %");
            if (lento.Vaihe == LentoVaihe.Valmis) return;
            y.Kuvaa(lento.Asento);
            // Esilataus: lennon ja pysähdyksen aikana seuraava pysähdys, odotuksessa nykyinen.
            int seuraava = lento.Vaihe == LentoVaihe.Pysahdys ? Math.Min(lento.Indeksi + 1, lento.Reitti.Count - 1) : lento.Indeksi;
            kaupunki.AsetaEsikamera(lento.PysahdysAsento(seuraava, 0));
        }

        /// <summary>Komento "lontoo ohita|tila" (LinssiOhjain) ja UI:n napautus.</summary>
        public void Ohita() => lento?.Ohita();

        public string Tila() => lento == null ? $"{kierros.Tiedot.Id}: kiinni"
            : $"{kierros.Tiedot.Id}: {kaupunki.Kaytossa} {lento.Vaihe} {lento.Indeksi + 1}/{lento.Reitti.Count} {lento.Nykyinen.Id}, vaihe {lento.VaiheAika:F1}/{lento.VaiheKesto:F1} s, laatat {kaupunki.Latausaste:F0} %"
              + (Virhe != null ? ", VIRHE " + Virhe : "");

        System.Collections.IEnumerator PeitePois()
        {
            yield return new WaitForSecondsRealtime(0.3f);
            y?.Peite(false);
        }

        public void Sulje()
        {
            KyydinKameraEnnen.Ajo = null;
            KrediititTiivis.Paivita(false);
            y?.KuvausLoppui();
            bool avattiin = nakymaAuki;
            nakymaAuki = false;
            kaupunki.Sulje();
            SyoteLukko.Vapauta(this);
            if (avattiin)
            {
                y?.Pelikerrokset(true);
                y?.MusiikkiPitoon(false);
            }
            lento = null; paivitetty = -1; Virhe = null;
            Vaihtui?.Invoke(null);
        }
    }
}
