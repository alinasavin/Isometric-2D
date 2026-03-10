
import { HotspotData } from '../types/MapTypes';

export const mapData: HotspotData[] = [
  {
    "id": "h1",
    "x": 75,
    "y": 45,
    "title": "The Steam Engine",
    "shortDescription": "Heart of the locomotive.",
    "columnLeft": {
      "type": "image",
      "value": "https://images.unsplash.com/photo-1614539824368-7a542b827725?q=80&w=800&auto=format&fit=crop",
      "caption": "Internal combustion chamber mechanics."
    },
    "columnRight": {
      "type": "text",
      "value": "This 4-6-2 'Pacific' type steam engine represents the pinnacle of early 20th-century engineering. Capable of generating over 2,000 horsepower, it consumes coal at a rate of 3 tons per hour at full speed. The boiler pressure reaches 250 psi, driving the massive pistons that turn the wheels."
    },
    "ragStatus": {
      "red": "Boiler Pressure > 260 PSI",
      "amber": "Coal Feed Blockage Detected",
      "green": "Combustion Efficiency 98%"
    }
  },
  {
    "id": "h2",
    "x": 60,
    "y": 65,
    "title": "Driving Wheels",
    "shortDescription": "Power transmission.",
    "columnLeft": {
      "type": "video",
      "value": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "poster": "https://images.unsplash.com/photo-1596825205490-7253b8b172a0?q=80&w=800&auto=format&fit=crop",
      "caption": "Mechanism in motion."
    },
    "columnRight": {
      "type": "text",
      "value": "The massive driving wheels are 80 inches in diameter, designed for high-speed passenger service. They are connected by heavy steel connecting rods that transfer the reciprocating motion of the pistons into rotational force. Regular maintenance involves precise lubrication of the crankpins."
    },
    "ragStatus": {
      "red": "Axle Heat Critical",
      "amber": "Lubrication Levels Low",
      "green": "Alignment Nominal"
    }
  },
  {
    "id": "h3",
    "x": 20,
    "y": 55,
    "title": "Passenger Carriages",
    "shortDescription": "Vintage luxury travel.",
    "columnLeft": {
      "type": "text",
      "value": "Restored to their 1920s glory, these Pullman carriages feature mahogany paneling, velvet upholstery, and brass fixtures. Passengers can enjoy fine dining in the restaurant car or relax in their private compartments. The suspension system has been modernized for a smoother ride."
    },
    "columnRight": {
      "type": "image",
      "value": "https://images.unsplash.com/photo-1542256844-3236e7683933?q=80&w=800&auto=format&fit=crop",
      "caption": "Interior of the First Class cabin."
    },
    "ragStatus": {
      "red": "Emergency Brake Engaged",
      "amber": "HVAC Filter Check Due",
      "green": "Occupancy 45%"
    }
  },
  {
    "id": "h4",
    "x": 85,
    "y": 25,
    "title": "Exhaust Stack",
    "shortDescription": "Steam release valve.",
    "columnLeft": {
      "type": "image",
      "value": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop",
      "caption": "Steam billowing during departure."
    },
    "columnRight": {
      "type": "text",
      "value": "The rhythmic chuffing sound of a steam train is caused by the release of used steam through the blast pipe and up the chimney. This action also draws fresh air through the firebox, intensifying the fire and creating more steam—a self-regulating feedback loop."
    },
    "ragStatus": {
      "red": "Emissions Above Limit",
      "amber": "Soot Buildup Detected",
      "green": "Airflow Unobstructed"
    }
  },
  {
    "id": "h5",
    "x": 45,
    "y": 85,
    "title": "Railway Tracks",
    "shortDescription": "Standard gauge infrastructure.",
    "columnLeft": {
      "type": "text",
      "value": "These tracks are laid to the Standard Gauge of 4 feet 8.5 inches (1,435 mm). The rails are made of high-carbon steel to withstand the immense weight of the locomotive. The wooden sleepers (ties) are treated with creosote to prevent rot and are set in crushed stone ballast for drainage."
    },
    "columnRight": {
      "type": "video",
      "value": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "poster": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop",
      "caption": "Track inspection footage."
    },
    "ragStatus": {
      "red": "Fracture Detected at Mile 4",
      "amber": "Ballast Shift Warning",
      "green": "Clearance Valid"
    }
  },
  {
    "id": "h6",
    "x": 90,
    "y": 60,
    "title": "The Cowcatcher",
    "shortDescription": "Obstacle deflector.",
    "columnLeft": {
      "type": "image",
      "value": "https://images.unsplash.com/photo-1515165592879-1849288ec64a?q=80&w=800&auto=format&fit=crop",
      "caption": "Reinforced steel pilot."
    },
    "columnRight": {
      "type": "text",
      "value": "Also known as the pilot, the cowcatcher is designed to deflect obstacles from the track that might otherwise derail the train. While named for livestock, it primarily clears debris like fallen branches or rocks."
    },
    "ragStatus": {
      "red": "Impact Damage Visible",
      "amber": "Paint Scratches",
      "green": "Structural Integrity 100%"
    }
  },
  {
    "id": "h7",
    "x": 5,
    "y": 40,
    "title": "Autumn Forest",
    "shortDescription": "Scenic route.",
    "columnLeft": {
      "type": "video",
      "value": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "poster": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
      "caption": "Forest passing by."
    },
    "columnRight": {
      "type": "text",
      "value": "The railway line cuts through the historic Blackwood Forest, known for its vibrant autumn foliage. This region is a protected nature reserve, home to diverse wildlife including deer, foxes, and rare bird species."
    },
    "ragStatus": {
      "red": "Fire Risk: Extreme",
      "amber": "Wildlife on Track",
      "green": "Visibility Good"
    }
  },
  {
    "id": "h8",
    "x": 95,
    "y": 15,
    "title": "Headlamp",
    "shortDescription": "Illuminating the way.",
    "columnLeft": {
      "type": "text",
      "value": "The electric headlamp was a major safety innovation, replacing earlier oil lamps. Powered by a small steam turbine generator on the engine, it casts a beam over a mile down the track, allowing the engineer to spot hazards at night."
    },
    "columnRight": {
      "type": "image",
      "value": "https://images.unsplash.com/photo-1495571344521-39a971739b8a?q=80&w=800&auto=format&fit=crop",
      "caption": "Night operation."
    },
    "ragStatus": {
      "red": "Bulb Filament Fail",
      "amber": "Voltage Fluctuation",
      "green": "Output > 5000 Lumens"
    }
  }
];
