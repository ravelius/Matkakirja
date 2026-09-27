// PELIOHJAIN: ALOITUSLENTO (omistajan aloituskaava, Raamattu 23.9.2026; Fable).
//
// Uuden matkan lähtökaupunki valitaan kartalta. Valinnan jälkeen kone lentää Lontoosta valittuun
// kaupunkiin. Omistaja 24.9.2026 (build 7), webin mukaan: intro-puhe.mp3 (luennat.intro) soi jo
// ALOITUSPORTILLA avaustekstin kanssa (Natiivi-UI kutsuu SoitaIntro), sen jälkeen pulun avausesittely
// (Natiivi-UI; web js/livia.js), ja kohteen valinta keskeyttää molemmat heti. Koneen lähtiessä moottorin ääni
// ja puhe-lento-alku.mp3 (luennat.lento-alku, web lueLennonRepliikki) alkavat samalla hetkellä. Lennon kesto
// skaalautuu reitin pituuden mukaan 16–26 s (Fable 24.9., kamerakäsikirjoitus: Lontoo → Ateena = 20 s,
// LennonAikajana.Kesto) ja on vähintään lentorepliikin verran (enintään 26 s). Perillä saapuminen kulkee
// normaalisti (traileri tai lehti).
//
// Pelitila EI muutu lennosta: matka alkaa valitusta kaupungista kuten webissä (ei noppaa, ei hintaa,
// kultaiset jäljet ennallaan). Lento on esitys: Natiivisepän Nappula.AloitusLento (kamera zoomaa
// Lontooseen, lahti() kun kone lähtee, valmis() perillä), Natiivi-UI:n siirtymä kuuntelee
// AloituslentoAlkoi/AloituslentoPaattyi. Lontoosta alkava matka ja kohtaus ilman nappulaa: ei lentoa.
using System;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Aloituslennon lähtö: Lontoo (tarina alkaa Lontoosta, Fablen tarkastus C8).</summary>
        public const double AloitusLat = 51.507, AloitusLon = -0.128;
        /// <summary>Lentorepliikin oletuskesto, jos paketti ei kerro sitä (duration puuttuu).</summary>
        const float LentoAlkuOletusS = 15f;

        /// <summary>Aloituslento alkoi (kohde): Natiivi-UI:n siirtymä. Lentorepliikki on pelin (koneen lähtiessä).</summary>
        public event Action<string> AloituslentoAlkoi;
        /// <summary>Aloituslento päättyi perille (kohde), juuri ennen normaalia saapumista.</summary>
        public event Action<string> AloituslentoPaattyi;

        /// <summary>Onko aloituslento käynnissä (syöte estetty, kamera seuraa konetta).</summary>
        public bool AloituslentoKaynnissa { get; private set; }

        /// <summary>
        /// Lennon kesto (kamerareitti, build 11): reitin pituuden mukaan 16–26 s (LennonAikajana.Kesto; ennen
        /// kiinteä vähintään 20 s). Lentorepliikki (+ 1 s, ettei saapuminen katkaise luentaa) pidentää lentoa
        /// korkeintaan 26 sekuntiin asti.
        /// </summary>
        float AloituslennonKesto(double lat, double lon)
        {
            // Löydös 110 (omistaja 25.9. klo 14.5x): kiinteä kesto kohteen etäisyydestä riippumatta
            // (LennonAikajana.AloituslennonKestoS); ennen 16–26 s reitin pituuden mukaan (LennonAikajana.Kesto).
            // Omistajan päätös 25.9.: 10 s myös, vaikka lentorepliikki on pidempi (ei enää max(kesto, repliikki + 1 s)).
            return (float)LennonAikajana.AloituslennonKestoS;
        }

        /// <summary>
        /// Intro-luenta aloitusportin avaustekstin kanssa (Natiivi-UI, Aloitusnakyma.AloitaKirjoitus; web
        /// playIntroVoice). Kulkee pelin luentana, jotta avauksen äänisekoitus (musiikki ×0,6, etusivun
        /// maisema ×1,45) seuraa intron alkua ja loppua. Palauttaa virheen tai null.
        /// </summary>
        public string SoitaIntro() => luennat?.Intro == null ? "introa ei ole" : SoitaLuento(luennat.Intro, 0f);

        /// <summary>
        /// LÖYDÖS 118 (omistaja build 14): intro alkaa samassa aloitusruudussa Aloita seikkailu -painalluksesta, ja
        /// musiikki jatkuu (Tila.Avaus vain vaimentaa, AaniTaulut.AvauksenMusiikki 0,6 / 1,3 s). Intro-puhe ladataan
        /// portin aikana, jotta ääni alkaa heti eikä vasta latauksen jälkeen (kylmänä ~0,5–1 s, verkko-odotusmittari).
        /// Kutsutaan, kun luennat ovat valmiit ja aloitusnäkymä on auki, ja aina kun tila palaa aloitukseen.
        /// </summary>
        void EsilataaIntro()
        {
            if (Tila == SilmukanTila.Aloitus && luennat?.Intro?.Url != null) puhe?.Esilataa(luennat.Intro.Url);
        }

        /// <summary>
        /// Uuden matkan aloituslento valittuun kaupunkiin (UusiMatka). Palauttaa, lähtikö lento;
        /// false = ei nappulaa, pelisilmukka pois tai lähtö Lontoosta (intro soi kuten ennen).
        /// </summary>
        bool AloitaAloituslento(string kohde)
        {
            var nappula = Nappula;
            if (nappula == null || !Kaytossa || kohde == null || kohde == AloitusKaupunki) return false;
            var b = PeliApu.Koordinaatti(verkko, Sijainti.KaupungissaSijainti(kohde));
            if (!b.HasValue) return false;

            float kesto = AloituslennonKesto(b.Value.Lat, b.Value.Lon);
            // Valinta keskeyttää avausluennan heti (omistaja 24.9.2026, build 7; web doPickStart vaientaa kertojan
            // napautuksessa). Pulun avausesittely väistyy samasta hetkestä: Natiivi-UI kuuntelee AloituslentoAlkoi
            // (web peruLivianAvaus). Lentorepliikki alkaa vasta koneen lähtiessä.
            OhitaLuento();
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            PiilotaKortti();
            saapumisKaupunki = kohde;
            matkaKohde = b.Value;
            Tila = SilmukanTila.Matkalla;
            AloituslentoKaynnissa = true;
            saapumiskorttiTunnus++;
            try { AloituslentoAlkoi?.Invoke(kohde); } catch (Exception e) { Debug.LogException(e); }
            EsilataaSaapuminen(kohde);
            Debug.Log($"MATKAKIRJA peli: aloituslento Lontoo → {kohde}, {kesto:0.0} s");

            int tunnus = ++ajoTunnus;
            kameranOhitus = null;
            ajoValmis = () => AloituslentoPerilla(kohde);
            // Varareitti: zoomi 2,5 s + lento + vara (valmis tulee Nappulalta); löydös 84: lisäksi musta verho (häivytys
            // mustaan ja takaisin + latausodotus enintään Nappula.MustanKatto).
            ajoLoppuu = Time.unscaledTime + 2.5f + kesto + AjonVara + 2f + Nappula.MustanKatto + 2f * Mustaverho.Haivytys;
            // Lento v3 (Natiiviseppä 27.9.): odotus enintään 10 s + 15 s:n lento, ei verhoa.
            if (Nappula.LentoV3) ajoLoppuu = Time.unscaledTime + Nappula.LentoV3VaraS + AjonVara;
            try
            {
                nappula.AloitusLento(AloitusLat, AloitusLon, b.Value.Lat, b.Value.Lon, kesto,
                    () =>
                    {
                        if (tunnus != ajoTunnus) return;
                        // Kone lähtee: moottorin ääni, lentorepliikki (jokaisella avauslennolla) ja nousu samalla hetkellä.
                        // Avauslento ei ole siirto: web ei soita sille siirtymäraitaa (doPickStart), vain matkustamon maiseman.
                        IlmoitaLiike(Kulkutapa.Lento, 0, siirtymaraita: false);
                        Lentoaani(true, kesto);
                        AloitaLento(Lentosuunnitelma.Laske("lontoo", kohde, (AloitusLat, AloitusLon), b.Value, kesto,
                            kesto, aloitus: true));
                        var repliikki = luennat.LentoAlkuAvaukseen();
                        if (repliikki != null) SoitaLuento(repliikki, 0f);
                    },
                    () => { if (tunnus == ajoTunnus) AjoValmis(); });
            }
            catch (Exception e)
            {
                Debug.LogException(e);
                AjoValmis();
            }
            return true;
        }

        /// <summary>
        /// Löydös 83 (Natiivi-UI:n Ohita-nappi): aloituslento ohitetaan kokonaan. Kesken olevan zoomin ja lennon
        /// callbackit mitätöidään (ajoTunnus), lentorepliikki vaiennetaan, ja saapumiskortti (paperi) tulee heti;
        /// Nappula.PaataAloituslento purkaa lennon esityksen paperin alla kuten normaalisti (löydös 85). Ei tee mitään,
        /// jos aloituslento ei ole käynnissä tai lento on jo perillä (välikortti auki).
        /// </summary>
        public void OhitaAloituslento()
        {
            if (!AloituslentoKaynnissa || ajoValmis == null) return;
            ++ajoTunnus;
            OhitaLuento();
            Debug.Log("MATKAKIRJA peli: aloituslento ohitettu");
            AjoValmis();
        }

        void AloituslentoPerilla(string kohde)
        {
            var kortti = PeliNakymat.Saapumiskortti;
            if (kortti == null || matka == null || Tila != SilmukanTila.Matkalla)
            {
                AloituslentoLoppui(kohde, kameraPerilla: false);
                return;
            }
            // Saapumisen välikortti (löydös 52; web ui.js aloituslento → naytaSaapumiskortti): lennon ääni loppuu
            // (sfx.stopFlight), lento päättyy (web flight-active pois ja kohtaus.poistuma: yläpalkki palaa),
            // pergamenttiarkki nousee, ja sen alla kamera asettuu saapumisnäkymään (web kohtaus.pura). Kortin jälkeen saapuminen jatkuu (traileri tai lehti), ja arkki häipyy
            // valmiin kartan päältä ilman zoomausanimaatiota. Aloituslento päättyy vasta kortin jälkeen
            // (web aloituslentoKesken = false ja paataAloituslennonSignaali('loppu') kortin jälkeen).
            Lentoaani(false);
            PaataLento();
            // Löydös 162: saapuminen alkaa jo välikortista — kamera asettuu kortin alla saapumisnäkymään (Saavu), joten
            // kartan saapumisanimaatio näkee Kesken-tilan jo nyt. Perilla jatkaa samaa saapumista.
            SaapumisluentaAlkaa(kohde);
            int oma = ++saapumiskorttiTunnus;
            bool Voimassa() => oma == saapumiskorttiTunnus && AloituslentoKaynnissa && Tila == SilmukanTila.Matkalla;
            bool kameraPerilla = false;
            try
            {
                kortti(SaapumiskortinRivi(kohde),
                    () =>
                    {
                        if (!Voimassa()) return;
                        // Löydös 85: topografiapinta, kone ja lennon merkit pois vasta paperin alla.
                        Nappula?.PaataAloituslento();
                        Saavu(maaRajaus: false);
                        kameraPerilla = true;
                    },
                    () => { if (Voimassa()) AloituslentoLoppui(kohde, kameraPerilla); });
            }
            catch (Exception e)
            {
                Debug.LogException(e);
                if (Voimassa()) AloituslentoLoppui(kohde, kameraPerilla);
            }
        }

        /// <summary>Uusi aloituslento mitätöi kesken olevan välikortin kutsut.</summary>
        int saapumiskorttiTunnus;

        /// <summary>Web saapumisKortinTeksti: kaupungin nimi versaalina ja päivä isoisän ennätystä (80) vasten.</summary>
        string SaapumiskortinRivi(string kohde) =>
            PeliApu.KaupunginNimi(verkko, kohde).ToUpperInvariant() + " · PÄIVÄ " + matka.Tila.Paiva() + "/" + LaattaVakiot.EnnatysPaivat;

        void AloituslentoLoppui(string kohde, bool kameraPerilla)
        {
            AloituslentoKaynnissa = false;
            // Varareitti (ei korttia tai kortti keskeytyi): lennon esitys pois viimeistään tässä.
            Nappula?.PaataAloituslento();
            try { AloituslentoPaattyi?.Invoke(kohde); } catch (Exception e) { Debug.LogException(e); }
            // Saapuminen normaalisti: traileri tai kaupunkilehti (Perilla); kamera webin avauslennon tapaan
            // kaupunkinäkymään (siirto.js laske: omaKamera → kamera.kotiin ilman maan laatikkoa), ellei se jo
            // asettunut välikortin alla.
            Perilla(aloituslento: true, kameraPerilla: kameraPerilla);
        }
    }
}
