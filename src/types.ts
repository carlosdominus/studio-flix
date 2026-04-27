
export interface Class {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  classes: Class[];
}

export const INITIAL_DATA: Module[] = [
  {
    id: 'pure-light',
    title: 'Pure Light',
    classes: [
      {
        id: 'pl-1',
        title: 'Class 1',
        description: 'Introduction to the Pure Light environment and initial concepts.',
        videoUrl: 'https://drive.google.com/file/d/1pob6e7UAUqbACHDnFKJ9sXfOhI4fT5xQ/preview',
        thumbnail: 'https://i.ibb.co/JRvVYsQ6/PL1.png',
        duration: '12:40'
      },
      {
        id: 'pl-2',
        title: 'Class 2',
        description: 'Exploring the core techniques and workflow parameters.',
        videoUrl: 'https://drive.google.com/file/d/1FaBbLuAasm_VYYSeDdnRPHrEOymEzGMH/preview',
        thumbnail: 'https://i.ibb.co/qMZgg7wz/PL2.png',
        duration: '15:20'
      },
      {
        id: 'pl-3',
        title: 'Class 3',
        description: 'In-depth look at advanced settings and practical applications.',
        videoUrl: 'https://drive.google.com/file/d/1iL3w173kSDOo06cmgNUTTIEHB988F-IC/preview',
        thumbnail: 'https://i.ibb.co/DDGwbJ4Y/PL3.png',
        duration: '22:15'
      },
      {
        id: 'pl-4',
        title: 'Class 4',
        description: 'Conclusion of the module with final considerations and best practices.',
        videoUrl: 'https://drive.google.com/file/d/14TKERh_aomHH6okSVMUEb6BZF0h9PoJq/preview',
        thumbnail: 'https://i.ibb.co/zhPFnCJF/PL4.png',
        duration: '18:50'
      }
    ]
  },
  {
    id: 'silent-mind',
    title: 'Silent Mind',
    classes: [
      {
        id: 'sm-1',
        title: 'Class 1',
        description: 'First session covering the core principles and environment setup.',
        videoUrl: 'https://drive.google.com/file/d/1Ki7UDmxpn4YXinSKlL3pVZESXHFQd_Uy/preview',
        thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=60&w=800',
        duration: '10:30'
      },
      {
        id: 'sm-2',
        title: 'Class 2',
        description: 'Detailed walkthrough of the standard procedures and techniques.',
        videoUrl: 'https://drive.google.com/file/d/1GiKO2gosS-WBh7PymebNzxQcQ5aJ48k7/preview',
        thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=60&w=800',
        duration: '14:45'
      },
      {
        id: 'sm-3',
        title: 'Class 3',
        description: 'Intermediate module focused on practical application and depth.',
        videoUrl: 'https://drive.google.com/file/d/1ia9lyjfTyu_jmfwD6x0EXbRztbOxpR6T/preview',
        thumbnail: 'https://images.unsplash.com/photo-1459706662435-0d67f052882e?auto=format&fit=crop&q=60&w=800',
        duration: '21:10'
      },
      {
        id: 'sm-4',
        title: 'Class 4',
        description: 'Finalizing the module with integrated practices and reviews.',
        videoUrl: 'https://drive.google.com/file/d/1Df3hLuwcqUMC6uSAORBEB-_n9QVR8mDk/preview',
        thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=60&w=800',
        duration: '16:20'
      }
    ]
  },
  {
    id: 'spirit-balance',
    title: 'Spirit Balance',
    classes: [
      {
        id: 'sb-1',
        title: 'Class 1',
        description: 'Introduction to balance and harmony within the project scope.',
        videoUrl: 'https://drive.google.com/file/d/19vwqxFuLCGOUY_sooJ7K7PW9axCrzTS7/preview',
        thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=60&w=800',
        duration: '13:15'
      },
      {
        id: 'sb-2',
        title: 'Class 2',
        description: 'Achieving consistent results through applied framework methods.',
        videoUrl: 'https://drive.google.com/file/d/1R9AjN1Vg10cs0r-Wnlcb8WL06Lcd70As/preview',
        thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=60&w=800',
        duration: '19:40'
      },
      {
        id: 'sb-3',
        title: 'Class 3',
        description: 'Advanced refinements and finalizing technical details.',
        videoUrl: 'https://drive.google.com/file/d/1qFKhBeHV33ZrujrIlB8Azz2csgykEfv-/preview',
        thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=60&w=800',
        duration: '25:00'
      },
      {
        id: 'sb-4',
        title: 'Class 4',
        description: 'Masterclass concluding the spirit balance series.',
        videoUrl: 'https://drive.google.com/file/d/1rAOLM6T2muS6nH6er_wJ2BJfvvV9YV4J/preview',
        thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=60&w=800',
        duration: '31:50'
      }
    ]
  }
];
