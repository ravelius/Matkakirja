// DIORAAMAN HERÄTYS — puhdas logiikka (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohta 4).
// JS-pari: js/dioraama/heratys.js. Pariteettia vartioidaan Linssit-testit/kultaiset/dioraama-vektorit.json:lla.
//
// KAIKKI ON AJAN PUHDAS FUNKTIO (ElavaKohtaus-malli): sama (rakennus, aikataulu, t) antaa aina saman tuloksen
// riippumatta kutsujärjestyksestä — ei sisäistä, kutsujen välistä tilaa. `edellinenTaso` (ks. AanenVoimakkuus)
// johdetaan siksi aina aikataulun historiasta (TilanTasoJaEdellinen), ei säilötä kutsujen välillä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Yksi kamera-aikataulun tapahtuma (kohta 4/5): hetki, kohde (tilaId tai null = yleisnäkymä), kesto.</summary>
    public readonly struct Kameratapahtuma
    {
        public readonly double Hetki;
        public readonly string Kohde;
        public readonly double Kesto;
        public Kameratapahtuma(double hetki, string kohde, double kesto) { Hetki = hetki; Kohde = kohde; Kesto = kesto; }
    }

    /// <summary>Hahmon näkyvyys ja animaatiotila hetkellä t (Heratys.HahmonTila-metodin paluuarvo).</summary>
    public readonly struct HahmonTila
    {
        public readonly bool Naky;
        public readonly string Silmukka;
        public readonly int Ruutu;
        public HahmonTila(bool naky, string silmukka, int ruutu) { Naky = naky; Silmukka = silmukka; Ruutu = ruutu; }
    }

    public static class Heratys
    {
        /// <summary>Aikajanan yksi piste: hetki, jolloin taso vaihtui, uusi taso ja sitä edeltänyt taso.</summary>
        readonly struct Piste
        {
            public readonly double Aika;
            public readonly int Taso, Edellinen;
            public Piste(double aika, int taso, int edellinen) { Aika = aika; Taso = taso; Edellinen = edellinen; }
        }

        /// <summary>Tapahtuman tavoitetaso annetulle tilaId:lle: kohde → 2; kohteen naapurit → 1; muut → 0;
        /// kohde null → kaikki kohdistettavat 1 (muut, esim. "massa", 0).</summary>
        static int Tavoitetaso(Rakennus rak, Kameratapahtuma tapahtuma, string tilaId)
        {
            if (tapahtuma.Kohde == null)
            {
                var tila = rak.Tila(tilaId);
                return tila != null && tila.Kohdistettava ? 1 : 0;
            }
            if (tapahtuma.Kohde == tilaId) return 2;
            var kohdeTila = rak.Tila(tapahtuma.Kohde);
            if (kohdeTila != null && kohdeTila.Naapurit.Contains(tilaId)) return 1;
            return 0;
        }

        /// <summary>
        /// Rakentaa tilaId:n tasomuutosten aikajanan koko aikataulusta. Ensimmäinen tapahtuma (hetki 0, kesto 0)
        /// asettaa tason välittömästi (edellinen = taso: ei liukua). Sen jälkeen: LASKU (tavoite &lt; nykyinen)
        /// tapahtuu heti tapahtuman hetkellä; NOUSU (tavoite &gt; nykyinen) hetkellä hetki + 0,6·kesto. Sama
        /// tavoite kuin nykyinen taso ei tuota uutta pistettä. TULKINTA (ylilyönti): kyselyhetkellä t pätee
        /// TAULUKON VIIMEINEN piste jonka aika ≤ t (ks. NykyinenPiste) — toimitetussa esimerkkiaikataulussa
        /// NOUSUn viive ei koskaan ulotu seuraavan tapahtuman ohi, joten tätä ei testata ääritapauksena.
        /// </summary>
        static List<Piste> Aikajana(Rakennus rak, IReadOnlyList<Kameratapahtuma> aikataulu, string tilaId)
        {
            var pisteet = new List<Piste>();
            int? taso = null;
            foreach (var tapahtuma in aikataulu)
            {
                int tavoite = Tavoitetaso(rak, tapahtuma, tilaId);
                if (taso == null)
                {
                    pisteet.Add(new Piste(tapahtuma.Hetki, tavoite, tavoite));
                    taso = tavoite;
                    continue;
                }
                if (tavoite == taso.Value) continue;
                double aika = tavoite < taso.Value ? tapahtuma.Hetki : tapahtuma.Hetki + 0.6 * tapahtuma.Kesto;
                pisteet.Add(new Piste(aika, tavoite, taso.Value));
                taso = tavoite;
            }
            return pisteet;
        }

        /// <summary>Aikajanan viimeinen piste jonka aika ≤ t (ensimmäinen jos yksikään ei täsmää).</summary>
        static Piste NykyinenPiste(List<Piste> pisteet, double t)
        {
            var nykyinen = pisteet[0];
            foreach (var piste in pisteet) if (piste.Aika <= t) nykyinen = piste;
            return nykyinen;
        }

        /// <summary>tilanTaso(rak, aikataulu, tilaId, t) → (taso, alkoi).</summary>
        public static (int taso, double alkoi) TilanTaso(Rakennus rak, IReadOnlyList<Kameratapahtuma> aikataulu, string tilaId, double t)
        {
            var piste = NykyinenPiste(Aikajana(rak, aikataulu, tilaId), t);
            return (piste.Taso, piste.Aika);
        }

        /// <summary>
        /// LISÄYS SPEKSIN YLI (js/dioraama/heratys.js:n kommentti ja tests/fixtures/dioraama/vektorit.json
        /// "tulkinnat"): AanenVoimakkuudelle ei ole tilatonta julkista lähdettä kolmannelle parametrille
        /// (edellinenTaso) ilman tätä — TilanTaso ei sitä palauta. tilanTasoJaEdellinen(rak,aikataulu,tilaId,t)
        /// → { taso, alkoi, edellinenTaso } johtaa senkin samasta aikajanasta.
        /// </summary>
        public static (int taso, double alkoi, int edellinenTaso) TilanTasoJaEdellinen(
            Rakennus rak, IReadOnlyList<Kameratapahtuma> aikataulu, string tilaId, double t)
        {
            var piste = NykyinenPiste(Aikajana(rak, aikataulu, tilaId), t);
            return (piste.Taso, piste.Aika, piste.Edellinen);
        }

        /// <summary>Aikataulun viimeisin kohde hetkellä t (koko aikataulusta, ei tilakohtainen); null = yleisnäkymä.
        /// TULKINTA: tämä yksi haku ratkaisee "yleisnäkymässä"-ehdon kaikille tiloille/hahmoille samalla t:llä.</summary>
        static string ViimeisinKohde(IReadOnlyList<Kameratapahtuma> aikataulu, double t)
        {
            string kohde = aikataulu[0].Kohde;
            foreach (var tapahtuma in aikataulu) if (tapahtuma.Hetki <= t) kohde = tapahtuma.Kohde;
            return kohde;
        }

        static double Mod(double n, double m) => ((n % m) + m) % m;

        static int RuutuLaskuri(double t, double herasi, double fps, int ruudut) =>
            (int)Mod(Math.Floor((t - herasi) * fps), ruudut);

        /// <summary>
        /// hahmonTila(rak, aikataulu, tilaId, hahmoIndeksi, t) → { naky, silmukka, ruutu }. herääminen = tason
        /// alkoi + 0,2·hahmoIndeksi (porrastus). Taso 2 JA t ≥ herääminen → hahmon oma silmukka/fps/ruudut;
        /// taso 0 → 'idle', ruutu pakotetusti 0; muulloin (taso 1, TAI taso 2 ennen yksilöllistä heräämistä,
        /// TULKINTA) → 'idle', fps/2 (ei pyöristetä erikseen, TULKINTA). Yleisnäkymässä fps rajataan 6:een
        /// VIIMEISENÄ (TULKINTA). Reittihahmo (reitti ≠ null) näkyy vain tasolla 2; muut aina (TULKINTA).
        /// </summary>
        public static HahmonTila HahmonTila(Rakennus rak, IReadOnlyList<Kameratapahtuma> aikataulu, string tilaId, int hahmoIndeksi, double t)
        {
            var tila = rak.Tila(tilaId);
            var hahmo = tila.Hahmot[hahmoIndeksi];
            var henkilo = rak.Henkilot[hahmo.HenkiloId];
            var (taso, alkoi) = TilanTaso(rak, aikataulu, tilaId, t);
            double herasi = alkoi + 0.2 * hahmoIndeksi;
            bool ylanakymassa = ViimeisinKohde(aikataulu, t) == null;

            // Elävä linna (rakennuksella saapuminen): reittihahmot (vartija, soutaja) kulkevat aina, myös yleisnäkymässä.
            bool naky = hahmo.Reitti != null ? taso == 2 || rak.Saapuminen != null : true;
            // Saman henkilön paikallaan seisova hahmo piiloon yleisnäkymässä, kun elävä reittihahmo kulkee (ei tuplaa).
            if (naky && hahmo.Reitti == null && ylanakymassa && rak.Saapuminen != null && tila.Elava?.Reitti?.Henkilo == hahmo.HenkiloId) naky = false;

            string silmukkaNimi;
            Silmukka silmukka;
            double fps;
            if (taso == 2 && t >= herasi)
            {
                silmukkaNimi = hahmo.Silmukka;
                silmukka = henkilo.Silmukat[silmukkaNimi];
                fps = silmukka.Fps;
            }
            else if (taso == 0)
            {
                silmukkaNimi = "idle";
                silmukka = henkilo.Silmukat["idle"];
                fps = silmukka.Fps;
            }
            else
            {
                silmukkaNimi = "idle";
                silmukka = henkilo.Silmukat["idle"];
                fps = silmukka.Fps / 2.0;
            }
            if (ylanakymassa) fps = Math.Min(fps, 6);
            int ruutu = taso == 0 ? 0 : RuutuLaskuri(t, herasi, fps, silmukka.Ruudut);

            return new HahmonTila(naky, silmukkaNimi, ruutu);
        }

        /// <summary>
        /// aanenVoimakkuus(taso, alkoi, edellinenTaso, t): tavoitetaso→arvo on 0/0,25/1 (tasot 0/1/2). Lineaarinen
        /// liuku edellisestä tavoitteesta nykyiseen 1,2 sekunnissa alkaen kohdasta alkoi; jos edellinenTaso ==
        /// taso, ei liukua (heti tavoitteessaan).
        /// </summary>
        public static double AanenVoimakkuus(int taso, double alkoi, int edellinenTaso, double t)
        {
            double TavoiteArvo(int s) => s == 2 ? 1 : s == 1 ? 0.25 : 0;
            double kohdeArvo = TavoiteArvo(taso), alkuArvo = TavoiteArvo(edellinenTaso);
            if (alkuArvo == kohdeArvo) return kohdeArvo;
            double e = Math.Max(0, Math.Min(1, (t - alkoi) / 1.2));
            return alkuArvo + (kohdeArvo - alkuArvo) * e;
        }
    }
}
