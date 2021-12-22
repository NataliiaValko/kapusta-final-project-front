import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CategoriesRTK from './CategoriesRTK';
import { useGetCategoriesQuery } from '../../../redux/service/transactionApi';
import dataTranslated from './translateDataFunction.jsx'
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import s from './GraphDetails.module.scss';

const GraphDetails = ({ startDate, endDate }) => {
  const { data = [] } = useGetCategoriesQuery({ startDate, endDate });
  const [isActive, setisActive] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');
  const [diagramType, setDiagramType] = useState('column');
  const [windowSize, setWindowSize] = useState(window.outerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    handlerDiagramType();
  }, [windowSize]);


  // ФУНКЦИЯ Установка в стейт значения текущего width экрана
  const handleResize = () => {
    setWindowSize(window.outerWidth);
  };

  // ФУНКЦИЯ Установка в стейт тип диаграммы для разных устройств
  const handlerDiagramType = () => {
    if (windowSize < 321) {
      setDiagramType('bar');
    }
    if (windowSize > 320) {
      setDiagramType('column');
    }
  };

  // Функция вывода детелей расходов или доходов выбраной категории
  const sortCategoryDetails = data => {
    const detailsArrayKeys = [];
    const detailsArrayValues = [];

    const selectedCat = dataTranslated(data.data).filter(item => {
      return item.category === selectedCategory;
    });

    selectedCat.map(item => {
      return Object.keys(item.details).map(i => {
        return detailsArrayKeys.push(i);
      });
    });

    selectedCat.map(item => {
      return Object.values(item.details).map(i => {
        return detailsArrayValues.push(i);
      });
    });

    const detailsArray = detailsArrayKeys.map((item, index) => {
      return {
        name: item,
        y: detailsArrayValues[index],
      };
    });
    return detailsArray;
  };

  // Опции диаграммы
  const options = data => {
    const options = {
      chart: {
        type: diagramType,
      },

      title: {
        text: '',
        // text: 'Расходы',
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: -40,
            // rotation: 80,
            style: {
              // textOverflow: 'ellipsis',
              rotate: 42,
            },
          },
        },
      },
      responsive: {},
      series: [
        {
          name: 'Категории',
          colorByPoint: true,
          data: sortCategoryDetails(data),
          // keys: ['y', 'name'],
        },
      ],
    };
    return options;
  };

  return (
    <div className={s.graphDetails}>
      <CategoriesRTK
        setActiveCalss={setisActive}
        setCategory={setselectedCategory}
        setDiagramType={setDiagramType}
        startDate={startDate}
        endDate={endDate}
      />
      <div className={isActive === false ? s.diagramLarge : s.diagram}>
        {isActive === false && <h2 className={s.diagram_emptyTitle}>Выберите категорию</h2>}
        {isActive === true && (
          <div className={s.diagram__toggle}>
            <button onClick={() => setDiagramType('pie')} className={s.diagram__buttonPie}>
              <PieChartIcon />
            </button>
            <button onClick={() => setDiagramType('column')} className={s.diagram__buttonColumn}>
              <BarChartIcon />
            </button>
            <button onClick={() => setDiagramType('bar')} className={s.diagram__buttonBar}>
              <BarChartIcon />
            </button>
            <HighchartsReact highcharts={Highcharts} options={options(data)} />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default GraphDetails;
