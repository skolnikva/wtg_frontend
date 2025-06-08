import React, { useEffect, useState } from 'react';
import api from '@services/api';
// import CategoryMenu from '@organisms/Events/CategoryMenu/CategoryMenu';
import CategoryEventsSection from '@organisms/Events/CategoryEventsSection/CategoryEventsSection';
import useFilteredCategories from '@hooks/useFilteredCategories';

const HomePage = () => {
  const { filteredCategories, loading, error } = useFilteredCategories();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await Promise.all(
          filteredCategories.map(async (category) => {
            const response = await api.getEventsByCategory(category.id);
            return { category, events: response.items };
          })
        );
        setCategoryData(data);
      } catch (err) {
        console.error('Ошибка загрузки мероприятий:', err);
      }
    };

    if (filteredCategories.length) {
      fetchEvents();
    }
  }, [filteredCategories]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveCategoryId(category.id);
  };

  return (
    <div>
      {/* <CategoryMenu items={filteredCategories} onSelect={handleCategorySelect} /> */}

      {categoryData.map(({ category, events }) => (
        <div
          key={category.id}
          id={`category-section-${category.id}`}
          className={activeCategoryId === category.id ? styles.activeSection : ''}
        >
          <CategoryEventsSection
            categoryId={category.id}
            categoryName={category.plural_name}
            events={events}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
