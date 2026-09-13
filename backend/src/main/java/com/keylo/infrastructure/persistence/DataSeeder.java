package com.keylo.infrastructure.persistence;

import com.keylo.infrastructure.persistence.entity.AmenityEntity;
import com.keylo.infrastructure.persistence.entity.ProjectEntity;
import com.keylo.infrastructure.persistence.entity.TestimonialEntity;
import com.keylo.infrastructure.persistence.repository.SpringDataAmenityRepository;
import com.keylo.infrastructure.persistence.repository.SpringDataProjectRepository;
import com.keylo.infrastructure.persistence.repository.SpringDataTestimonialRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    private final SpringDataProjectRepository projectRepo;
    private final SpringDataAmenityRepository amenityRepo;
    private final SpringDataTestimonialRepository testimonialRepo;

    public DataSeeder(
        SpringDataProjectRepository projectRepo,
        SpringDataAmenityRepository amenityRepo,
        SpringDataTestimonialRepository testimonialRepo
    ) {
        this.projectRepo = projectRepo;
        this.amenityRepo = amenityRepo;
        this.testimonialRepo = testimonialRepo;
    }

    @Override
    public void run(String... args) {
        seedProjects();
        seedAmenities();
        seedTestimonials();
    }

    private void seedProjects() {
        if (projectRepo.count() > 0) return;

        List<ProjectEntity> projects = List.of(
            new ProjectEntity(
                "ace-new-launch",
                "ace-new-launch",
                "ACE New Launch 2.0",
                "ACE Group",
                "Sector 150, Noida Expressway",
                "Ultra-Luxury 3 & 4 BHK Iconic Residences",
                "New Launch Opportunity",
                "On Request",
                "/assets/Ace150-Bdm9uZbl.avif",
                "New Launch",
                "ACE New Launch 2.0 at Sector 150, Noida is an ultra-luxury low-density residential masterpiece offering state-of-the-art 3 and 4 BHK luxury residences surrounded by lush 80% green expanses.",
                "[{\"type\":\"3 BHK Luxury\",\"size\":\"2200 Sq. Ft.\",\"price\":\"On Request\"},{\"type\":\"4 BHK Ultra Luxury\",\"size\":\"3200 Sq. Ft.\",\"price\":\"On Request\"}]",
                "[\"Low Density Development with 80% Greenery\",\"Grand 50,000 sq.ft. Clubhouse & Spa\",\"Direct Connectivity to Noida-Greater Noida Expressway\"]",
                "[\"Clubhouse & Banquet Hall\",\"Infinity Swimming Pool\",\"Squash & Tennis Courts\"]"
            ),
            new ProjectEntity(
                "ats-kingston-heath",
                "ats-kingston-heath",
                "ATS Kingston Heath",
                "ATS Infrastructure",
                "Sector 150, Noida",
                "Premium Health & Wellness Inspired Apartments",
                "Exclusive Elite Living",
                "On Request",
                "/assets/ATS Kingston Heath-CZDTle7q.avif",
                "Exclusive",
                "ATS Kingston Heath in Sector 150 Noida is an iconic residential enclave inspired by wellness and holistic health.",
                "[{\"type\":\"3 BHK + Utility\",\"size\":\"2350 Sq. Ft.\",\"price\":\"On Request\"},{\"type\":\"4 BHK + Servant\",\"size\":\"3300 Sq. Ft.\",\"price\":\"On Request\"}]",
                "[\"Health-focused architectural design\",\"Overlooking 9-hole golf course greens\",\"Dedicated reflexology parks\"]",
                "[\"Wellness Clubhouse & Hydrotherapy\",\"Cricket Practice Net\"]"
            ),
            new ProjectEntity(
                "godrej-tropical-isle",
                "godrej-tropical-isle",
                "Godrej Tropical Isle",
                "Godrej Properties",
                "Sector 146, Noida Expressway",
                "Island-Themed Resort Living 3 & 4 BHK",
                "Under Construction",
                "₹ 3.20 Cr*",
                "/assets/Godrej Tropical Isle-CKyU2H2M.avif",
                "Island Resort",
                "Godrej Tropical Isle brings Miami-inspired tropical luxury to Sector 146 Noida.",
                "[{\"type\":\"3 BHK Luxury\",\"size\":\"1800 Sq. Ft.\",\"price\":\"₹ 3.20 Cr*\"},{\"type\":\"4 BHK Ultra Luxury\",\"size\":\"2500 Sq. Ft.\",\"price\":\"₹ 4.40 Cr*\"}]",
                "[\"Private artificial beach & island water features\",\"Ultra-chic air-conditioned lobbies\",\"Adjacent to Metro station\"]",
                "[\"Private Beach Lounge\",\"Mini Theatre\",\"Heated Indoor Pool\"]"
            ),
            new ProjectEntity(
                "max-estates-128",
                "max-estates-128",
                "Estate 128 by Max",
                "Max Estates",
                "Sector 128, Noida Expressway",
                "Boutique Golf Residences with 80% Green Buffer",
                "Ready to Move Soon",
                "₹ 5.50 Cr*",
                "/assets/Estate 128 by Max-BDQy852R.avif",
                "Golf Facing",
                "Estate 128 by Max Estates is a flagship boutique residential sanctuary.",
                "[{\"type\":\"4 BHK Golf Residence\",\"size\":\"4100 Sq. Ft.\",\"price\":\"₹ 5.50 Cr*\"},{\"type\":\"5 BHK Sky Mansion\",\"size\":\"5400 Sq. Ft.\",\"price\":\"₹ 7.20 Cr*\"}]",
                "[\"Direct panoramic vistas of Jaypee Greens Golf Course\",\"Biophilic architecture\",\"LEED Platinum Certified Green Building\"]",
                "[\"Concierge & Valet Service\",\"Private Wine Cellar & Cigar Lounge\",\"Spa & Sauna Pavilions\"]"
            )
        );

        projectRepo.saveAll(projects);
    }

    private void seedAmenities() {
        if (amenityRepo.count() > 0) return;

        List<AmenityEntity> amenities = List.of(
            new AmenityEntity(1L, "Basketball Court", "/assets/basketball court-CewmyJew.jfif", "Activity", "Sports & Fitness", false),
            new AmenityEntity(2L, "Swimming Pools", "/assets/Swimming Pools-B8-nFFwf.jfif", "Waves", "Recreation", false),
            new AmenityEntity(3L, "Party Lawn", "/assets/Party Lawn-CDDGXRy6.avif", "Sparkles", "Social Life", true),
            new AmenityEntity(4L, "Jogging Track", "/assets/Jogging Track-DvX69wTE.jfif", "Footprints", "Health & Nature", false),
            new AmenityEntity(5L, "Amphitheatre", "/assets/Amphitheatre-onHQm0lz.jpg", "Tv", "Entertainment", false),
            new AmenityEntity(6L, "Tennis Court", "/assets/Tennis Court-DDvOvFEn.jpg", "Trophy", "Sports & Fitness", false),
            new AmenityEntity(7L, "Kids Play Area", "/assets/Kids Play Area-COCEukLN.avif", "Smile", "Family & Kids", false),
            new AmenityEntity(8L, "Cricket Net Practice", "/assets/Cricket Net Practice-BYtTBcwi.jpg", "Target", "Sports & Fitness", false)
        );

        amenityRepo.saveAll(amenities);
    }

    private void seedTestimonials() {
        if (testimonialRepo.count() > 0) return;

        List<TestimonialEntity> testimonials = List.of(
            new TestimonialEntity(
                1L,
                "Vikramaditya Singhania",
                "Managing Director, Tech Ventures",
                "Invested in ACE New Launch 2.0 (Sector 150)",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                5,
                "Keylo provided flawless clarity when we were looking for a low-density 4 BHK along the Expressway. Their direct builder access secured us the best high-floor corner unit before public allotment."
            ),
            new TestimonialEntity(
                2L,
                "Dr. Ananya Mukherjee",
                "Senior Consultant Neurosurgeon",
                "Purchased at ATS Kingston Heath",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
                5,
                "Transparent, honest, and truly professional. No pushy sales calls—just data-driven market insights and swift legal paper checks. My family couldn't be happier with our new home."
            ),
            new TestimonialEntity(
                3L,
                "Rohit & Shreya Malhotra",
                "Entrepreneurs & Angel Investors",
                "Purchased at Godrej Crown",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                5,
                "The personalized site visits, unit comparisons, and bespoke negotiation support from Keylo made our luxury property purchase effortless. Highly recommended!"
            ),
            new TestimonialEntity(
                4L,
                "Capt. Rajesh Verma (Retd.)",
                "Aviation Consultant",
                "Commercial Unit at Max 105",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
                5,
                "Securing a Grade-A retail spot on Noida Expressway with assured rental visibility was made seamless by their commercial investment team. Their strategic market knowledge is unmatched."
            )
        );

        testimonialRepo.saveAll(testimonials);
    }
}
